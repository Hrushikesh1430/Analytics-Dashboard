import Styles from "./SideBar.module.css";
import logo from "../../assets/images/phone-flip.svg";
export const SideBar = () => {
  return (
    <div className={Styles.sideBar}>
      <nav>
        <span className={Styles.Logo}>
          <img src={logo} alt="logo" />
          Dash Chart
        </span>
        <ul>
          <li>Dashboard</li>
        </ul>
      </nav>
    </div>
  );
};
