import { AppBar, Toolbar } from "@mui/material";
import NavLinkComponent from "./NavLinkComponent.js";
import CampaignIcon from "@mui/icons-material/Campaign";
import useStyles from "./useStyles.jsx";

const AppBarComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar>
        <CampaignIcon className={classes.navIcon} />
        <nav>
          <NavLinkComponent to="/">Home </NavLinkComponent>|
          <NavLinkComponent to="/newspanel">News Panel </NavLinkComponent>|
          <NavLinkComponent to="/faves">Faves </NavLinkComponent>|
          <NavLinkComponent to="/contact">Contact Us</NavLinkComponent>
        </nav>
      </Toolbar>
    </AppBar>
  );
};
export default AppBarComponent;
