import classes from "./Header.module.css";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";
// import "../../index.css";

const Header = () => {
  let isDarkMode = true;
  const logoSrc = isDarkMode ? logoLight : logoDark;

  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img src={logoSrc} alt="logo" />
      </div>
      <div className={classes.header__container}>
        <h1 className="heading--xl">Platform Launch</h1>
        <button>+ Add New Task</button>
        <button>More actions</button>
      </div>
    </header>
  );
};

export default Header;
