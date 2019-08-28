import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import HomeScreen from './HomeScreen'
import CategoriesScreen from './CategoriesScreen'
import LocationsScreen from './LocationsScreen'
import MapScreen from './MapScreen'
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/BurstMode'
import LocationIcon from '@material-ui/icons/Room';
import MapIcon from '@material-ui/icons/Public';

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#4350AF",
        zIndex: 100,
    },
});

const navStyle = {
    nav: {
        color: 'aliceblue',
    },
    icon: {
        color: 'aliceblue'
    }
};

export default function AppRouter() {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const AppToolbarRouterProps = withRouter(props => <Navbar {...props} />);

    return (
        <Router>
            <div>
                <AppToolbarRouterProps />
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction
                        style={navStyle.nav}
                        component={Link}
                        to="/"
                        label="Home"
                        icon={<HomeIcon style={navStyle.icon}
                        />}
                    />
                    <BottomNavigationAction
                        style={navStyle.nav}
                        component={Link}
                        to="/categories"
                        label="Categories"
                        icon={<CategoryIcon style={navStyle.icon} />}
                    />
                    <BottomNavigationAction
                        style={navStyle.nav}
                        component={Link}
                        to="/locations"
                        label="Locations"
                        icon={<LocationIcon style={navStyle.icon} />}
                    />
                    <BottomNavigationAction
                        style={navStyle.nav}
                        component={Link}
                        to="/map"
                        label="Map"
                        icon={<MapIcon style={navStyle.icon} />}
                    />
                </BottomNavigation>
                <Route path="/" exact component={HomeScreen} />
                <Route path="/categories" exact component={CategoriesScreen} />
                <Route path="/locations" exact component={LocationsScreen} />
                <Route path="/map" exact component={MapScreen} />
            </div>
        </Router>
    );
}