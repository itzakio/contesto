import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiMenuFill } from "react-icons/ri";
import { Link, NavLink } from "react-router";
import logo from "/logo.png";
import { RxCrossCircled } from "react-icons/rx";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const role = useRole();

  console.log(role.role);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeHandler = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <NavLink className="nav-links" to="/">
        Home
      </NavLink>

      <NavLink className="nav-links" to="/all-contests">
        All Contests
      </NavLink>
      <NavLink className="nav-links" to="/leaderboard">
        Leaderboard
      </NavLink>
      {role?.role === "user" && (
        <NavLink className="nav-links" to="/be-a-creator">
          Be A Creator
        </NavLink>
      )}

      {role?.role === "creator" && (
        <>
          <NavLink className="nav-links" to="/create-contest">
            Create Contest
          </NavLink>
        </>
      )}

      <NavLink className="nav-links" to="/how-it-works">
        How It Works
      </NavLink>
      <NavLink className="nav-links" to="/about-us">
        About Us
      </NavLink>
      <NavLink className="nav-links" to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );
  return (
    <nav
      className={`transition-all duration-300 z-999 shadow ${
        isSticky
          ? "fixed top-0 left-0 w-full backdrop-blur-xs bg-base-100/1 shadow-md"
          : "relative bg-base-100"
      }`}
    >
      <div className="navbar z-999  max-w-[1440px] mx-auto px-4 ">
        <div className="navbar-start">
          <Link to="/" className="flex items-center">
            <img className="size-12" src={logo} alt="" />
            <div className="hidden md:block">
              <h3 className="text-3xl font-extrabold text-primary">Contesto</h3>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal hidden xl:flex font-semibold gap-4 ">
            {links}
            {/* main links */}
          </ul>
        </div>

        <div className=" navbar-end flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <div>
              {/* theme toggle button */}
              <label className="toggle text-base-content">
                <input
                  checked={theme === "dark"}
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                  // onClick={(e) => themeHandler(e.target.checked)}
                  // defaultChecked={theme === "dark" ? true : false}
                  type="checkbox"
                  value="synthwave"
                  className="theme-controller"
                />

                <svg
                  aria-label="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>

                <svg
                  aria-label="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>
            </div>
            <div>
              {user && user.photoURL ? (
                <img
                  onClick={() => setShow(!show)}
                  title={user.displayName}
                  className="size-10 object-cover rounded-full border cursor-pointer"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <CgProfile onClick={() => setShow(!show)} size={40} />
              )}
            </div>
            {user ? (
              <button
                onClick={() => logOutUser()}
                className="btn font-medium bg-primary text-black"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn font-medium bg-primary text-black"
              >
                Login
              </Link>
            )}
          </div>
          <RiMenuFill
            onClick={() => setShow(!show)}
            size={24}
            className="xl:hidden"
          />
        </div>
      </div>

      {/* aside bar */}

      <aside
        className={`bg-base-100 w-80 h-screen p-8 absolute top-0 z-999 flex flex-col items-center transition-all duration-300 shadow-2xl ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center w-full mb-4">
          <div
            className="bg-primary p-2 rounded-full text-black cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <RxCrossCircled size={24} />
          </div>
          <label className="toggle lg:hidden text-base-content">
            <input
              onClick={(e) => themeHandler(e.target.checked)}
              defaultChecked={theme === "dark" ? true : false}
              type="checkbox"
              value="synthwave"
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div>
            {user ? (
              <img
                title={user?.displayName}
                className="size-28 object-cover rounded-full border"
                src={user?.photoURL}
                alt=""
              />
            ) : (
              <CgProfile size={112} />
            )}
          </div>
          <div className="text-xl font-semibold">
            {user ? <p>{user?.displayName}</p> : <p>User</p>}
            <p className=" text-xs bg-green-300 text-green-700 p-1 text-center">
              {role.role}
            </p>
          </div>
          {user ? (
            <Link
              to="/dashboard"
              className="btn font-medium bg-primary text-black"
            >
              View Profile
            </Link>
          ) : (
            <Link to="/login" className="btn font-medium bg-primary text-black">
              Login
            </Link>
          )}
        </div>
        <div className="mt-8 xl:hidden">
          <h4 className="text-center mb-4">Menu</h4>
          <div>{links}</div>
        </div>
        {user && (
          <button
            onClick={() => logOutUser()}
            className="btn font-medium bg-primary text-black absolute bottom-8"
          >
            Logout
          </button>
        )}
      </aside>
    </nav>
  );
};

export default Navbar;
