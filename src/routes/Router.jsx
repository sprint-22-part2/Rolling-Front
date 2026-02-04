import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/MainLayout';
import MainPage from '@/pages/MainPage';
import ListPage from '@/pages/ListPage';
import PostPage from '@/pages/PostPage';
import LandingPage from '@/pages/LandingPage';
import MessagePage from '@/pages/MessagePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/list" element={<ListPage theme="blue" />} />
          <Route path="/post" element={<PostPage />} />
          {/* <Route path="/post/message" element={<MessagePage />} /> */}
          <Route path="/post/:recipientId" element={<ListPage />} />
          <Route path="/post/:recipientId/message" element={<MessagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
