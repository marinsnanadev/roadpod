import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SplitText from './SplitText';
import Crew from './pages/Crew';

const menuItems = {
  'Sobre': ['Crew', 'Contato', 'FAQ'],
  'Episódios': ['Todos os episódios', 'Episódios especiais', 'Análise do mangá', 'Fillers'],
  'Redes Sociais': ['Spotify', 'Falecido Twitter (X)', 'Instagram', 'Bluesky'],
  // 'Inscreva-se': ['Apoia-se'],
};

const itemRoutes = {
  'Crew': '/crew',
  'Spotify': 'https://open.spotify.com/show/1i6oVgf1NiEJCPhxrpsB7Z?si=c98091d1149948fe',
  'Falecido Twitter (X)': 'https://twitter.com/roadpodglifos',
  'Instagram': 'https://www.instagram.com/roadpodglifos/',
  'Bluesky': 'https://bsky.app/profile/roadpodglifos.bsky.social',
  // 'Apoia-se': 'https://apoia.se/roadpodglifos',
};

function NavDropdown({ label, options }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleItemClick = (opt) => {
    setOpen(false);
    const route = itemRoutes[opt];
    if (!route) return;

    if (/^https?:\/\//.test(route)) {
      window.open(route, '_blank', 'noopener,noreferrer');
      return;
    }

    navigate(route);
  };

  return (
    <div
      className="dropdown-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="nav-btn" onClick={handleButtonClick}>
        {label}
        <span className={`arrow ${open ? 'hidden' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          className="dropdown-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((opt) => (
            <li
              key={opt}
              className="dropdown-item"
              onClick={() => handleItemClick(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand navbar-brand-link">
        <img src={logo} className="navbar-logo" alt="logo" />
        <SplitText
          text="Road Podglifos"
          className="navbar-title"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />
      </Link>
      <div className="navbar-buttons">
        {Object.entries(menuItems).map(([label, options]) => (
          <NavDropdown key={label} label={label} options={options} />
        ))}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <main className="App-main">
      {/* dnfjghfdghfuidg */}
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crew" element={<Crew />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;