import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonPreview from '@/pages/ButtonPreview/ButtonPreview';
import ReactionPreview from '@/pages/ReactionPreview/ReactionPreview';
import Layout from '@/components/Layout';
import RollingListPage from '@/pages/RollingListPage';
import PostListPage from '@/pages/PostListPage';
import LinkButtonPreview from '@/pages/LinkButtonPreview/LinkButtonPreview';
import ProfilePage from '@/pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/preview/button" element={<ButtonPreview />} />
        <Route path="/preview/reaction" element={<ReactionPreview />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/list" element={<RollingListPage />} />
          <Route path="/post" element={<PostListPage theme="blue" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/preview/button" element={<ButtonPreview />} />
          <Route path="/preview/linkButton" element={<LinkButtonPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
