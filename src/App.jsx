import AppRoutes from './routes/Router';
import { ToastProvider } from '@/contexts/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}

export default App;
