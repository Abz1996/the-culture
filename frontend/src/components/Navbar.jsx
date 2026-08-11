import { NavLink } from "react-router-dom";
import CoffeeRings from "./CoffeeRings.jsx";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/foods", label: "Cuisine" },
  { to: "/culture", label: "Culture" },
  { to: "/regions", label: "Regions" }
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <CoffeeRings className="brand-mark" />
          Habesha Table
        </NavLink>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
