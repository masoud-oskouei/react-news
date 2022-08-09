import { NavLink } from "react-router-dom";
import useStyles from "./useStyles.jsx";

const NavLinkComponent = (props) => {
  const classes = useStyles();
  return (
    <NavLink
      to={props.to}
      style={({ isActive }) =>
        isActive ? { color: "#fc814a" } : { color: "#DBDFAC" }
      }
      className={classes.navLink}
    >
      {" "}
      {props.children}{" "}
    </NavLink>
  );
};
export default NavLinkComponent;
