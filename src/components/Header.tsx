import React, { useEffect, useRef, useState } from "react";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const userName = "Ahmet";
  const initial = userName.charAt(0).toUpperCase();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">🛍️</div>
        <div className="title">Shoppingly</div>
      </div>

      <div className="avatar-wrap" ref={menuRef} onClick={() => setOpen(!open)}>
        <div className="avatar">{initial}</div>
        {open && (
          <div className="dropdown">
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item logout">Logout</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
