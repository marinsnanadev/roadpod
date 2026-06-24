import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SplitText from '../SplitText';
import NavDropdown from './NavDropdown';
import { menuItems } from '../data/menuItems';

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
        {menuItems.map(({ label, options }) => (
          <NavDropdown key={label} label={label} options={options} />
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
