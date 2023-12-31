import Styles from "./SideBar.module.css";
import logo from "../../assets/images/phone-flip.svg";
import { useLocation, useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogOut = () => {
    localStorage.removeItem("chartAnalytics");
    navigate("/login", { state: { from: location } });
  };
  return (
    <div className={Styles.sideBar}>
      <nav>
        <span className={Styles.Logo}>
          <img src={logo} alt="logo" />
          Dash Chart
        </span>
        <ul>
          <li>Dashboard</li>
          <li onClick={() => handleLogOut()}>Logout</li>
        </ul>
      </nav>
    </div>
  );
};
