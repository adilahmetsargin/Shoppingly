import React from "react";

const DarkModeToggle: React.FC<{
  dark: boolean;
  setDark: (v: boolean) => void;
}> = ({ dark, setDark }) => {
  return (
    <button
      className="dark-toggle"
      onClick={() => setDark(!dark)}
      aria-pressed={dark}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;
