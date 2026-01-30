import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/MainLayout';
import MainPage from '@/pages/MainPage';
import ListPage from '@/pages/ListPage';
import PostPage from '@/pages/PostPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/list" element={<ListPage theme="blue" />} />
          <Route path="/post/create" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
