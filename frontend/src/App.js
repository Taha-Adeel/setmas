import Layout from './pages/layout';
import Home from './pages/home';
import Book from './pages/book';
import NotFoundPage from './pages/notfound';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="book" element={<Book />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
