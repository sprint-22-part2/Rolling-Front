import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '@/components/common/Toast';
import styles from './ToastContext.module.css';
import ToastContextValue from './toastContextValue';

const DEFAULT_DURATION = 5000;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef(new Map());

  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeoutId = timeoutsRef.current.get(id);
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, status = 'success', duration = DEFAULT_DURATION) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      let targetId = id;

      setToasts((prev) => {
        const lastToast = prev[prev.length - 1];
        if (
          lastToast &&
          lastToast.message === message &&
          lastToast.status === status
        ) {
          targetId = lastToast.id;
          return [
            ...prev.slice(0, -1),
            { ...lastToast, count: (lastToast.count ?? 1) + 1 },
          ];
        }

        return [...prev, { id, message, status, count: 1 }];
      });

      const existingTimeout = timeoutsRef.current.get(targetId);
      if (existingTimeout) {
        window.clearTimeout(existingTimeout);
      }

      const timeoutId = window.setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== targetId));
        timeoutsRef.current.delete(targetId);
      }, duration);
      timeoutsRef.current.set(targetId, timeoutId);
    },
    []
  );

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeouts.clear();
    };
  }, []);

  const value = useMemo(
    () => ({ showToast, hideToast }),
    [showToast, hideToast]
  );

  return (
    <ToastContextValue.Provider value={value}>
      {children}
      {toasts.length > 0 && (
        <div className={styles.toastContainer}>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              status={toast.status}
              count={toast.count}
              onClose={() => hideToast(toast.id)}
            />
          ))}
        </div>
      )}
    </ToastContextValue.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
