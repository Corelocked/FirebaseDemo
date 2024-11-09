import { BrowserRouter, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Article from './pages/Article';
import FormArticle from './pages/FormArticle';
import EditArticle from './pages/EditArticle';  // Import the new component
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/new">New Article</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/articles/:urlId" element={<Article />} />
          <Route path="/new" element={<FormArticle />} />
          <Route path="/edit/:urlId" element={<EditArticle />} />  {/* New route for editing */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
