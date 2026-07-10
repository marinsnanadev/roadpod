import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function NavDropdown({ label, options, isOpen, onOpen, onScheduleClose, onCloseImmediate }) {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onCloseImmediate();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onCloseImmediate]);

  const handleMouseEnter = () => {
    onOpen();
  };

  const handleMouseLeave = () => {
    onScheduleClose();
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isOpen) {
      onCloseImmediate();
    } else {
      onOpen();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCloseImmediate();
    }
  };

  const handleItemClick = (item) => {
    onCloseImmediate();
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
        aria-expanded={isOpen}
      >
        {label}
        <span className={`arrow ${isOpen ? 'hidden' : ''}`}>▾</span>
      </button>

      {isOpen && (
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