import { useEffect, useState } from "react";

const ThemeProvider = ({ children }) =>{
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return children;
}

export default ThemeProvider