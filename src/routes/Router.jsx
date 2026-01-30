import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import RollingListPage from '@/pages/RollingListPage';
import PostListPage from '@/pages/PostListPage';
import ButtonPreview from '../pages/ButtonPreview/ButtonPreview';
import ProfilePage from '@/pages/ProfilePage';
import LandingPage from '@/pages/LandingPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/list" element={<RollingListPage />} />
          <Route path="/post" element={<PostListPage theme="blue" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/preview/button" element={<ButtonPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
