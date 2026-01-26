import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import RollingListPage from '@/pages/RollingListPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/list" element={<RollingListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
