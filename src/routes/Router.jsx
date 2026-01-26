import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonPreview from '../pages/ButtonPreview.jsx/ButtonPreview';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/preview/button" element={<ButtonPreview />} />
      </Routes>
    </BrowserRouter>
  );
}
