import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Layout from '@/components/Layout';
import RollingListPage from '@/pages/RollingListPage';
import PostListPage from '@/pages/PostListPage';
=======
import ButtonPreview from '../pages/ButtonPreview/ButtonPreview';
>>>>>>> upstream/develop
import ProfilePage from '@/pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/list" element={<RollingListPage />} />
          <Route path="/post" element={<PostListPage theme="blue" />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
=======
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/preview/button" element={<ButtonPreview />} />
        <Route path="/profile" element={<ProfilePage />} />
>>>>>>> upstream/develop
      </Routes>
    </BrowserRouter>
  );
}
