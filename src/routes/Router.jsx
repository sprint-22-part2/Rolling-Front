import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import RollingListPage from '@/pages/RollingListPage';
import PostListPage from '@/pages/PostListPage';
import ProfilePage from '@/pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/list" element={<RollingListPage />} />
          <Route path="/post" element={<PostListPage theme="blue" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
