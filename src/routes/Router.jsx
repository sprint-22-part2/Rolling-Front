import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonPreview from '../pages/ButtonPreview/ButtonPreview';
import ReactionPreview from '../pages/ReactionPreview/ReactionPreview';
import ProfilePage from '@/pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/preview/button" element={<ButtonPreview />} />
        <Route path="/preview/reaction" element={<ReactionPreview />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
