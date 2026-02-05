import AppRoutes from './routes/Router';
import { ToastProvider } from '@/contexts/ToastContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </ToastProvider>
  );
}

export default App;
