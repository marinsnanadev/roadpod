import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleItemClick = (item) => {
    setOpen(false);
    const { route } = item;
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
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className="nav-btn"
        onClick={handleButtonClick}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
        <span className={`arrow ${open ? 'hidden' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          className="dropdown-menu"
          role="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {options.map((item) => (
            <li key={item.label} className="dropdown-item" role="none">
              <button
                type="button"
                role="menuitem"
                className="dropdown-item-button"
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NavDropdown;
