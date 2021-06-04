import React, { useEffect, useContext } from 'react'
import { UserContext } from "../../utils/UserContext";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

//Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

//Importing logo
import Logo from "../../assets/logoblue.png";

//Import icons
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LineStyleIcon from '@material-ui/icons/LineStyle';
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//Importing pages
import FindStock from "../../components/FindStock";
import YourDash from '../../components/YourDash';

//importing Auth
import Auth from "../../utils/Auth";

import "./style.css"

//Some styling for MaterialUI
const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
        textDecoration: 'none',
        color: '#cbcbcb'
    },
    img: {
        margin: '20px',
    }
}))

/* This is a very simple component.. it probably doesn't need to be a smart component at this point but you never know what's goingto happen in the future */

function ProtectedRoute() {

    const [user, dispatch] = useContext(UserContext)
    const history = useHistory();
    console.log(user)

    useEffect(() => {
        fetch('api/users/user', {
            credentials: 'include'
        })
            .then((res) => {
                console.log(`response to authenticate ${res}`);
                return res.json(res)

            })
            .then(data => {
                console.log(data);
                dispatch({
                    type: "GET_USER",
                    payload: data
                })

            })
            .catch((err) => {
                console.log('Error fetching authorized user.');
            });

    }, []);

    const classes = useStyles();

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Drawer
                    id="drawer"
                    style={{ width: '220px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}>
                    <img src={Logo} alt="logo" className={classes.img} />
                    <List>
                        <Link to="/dashboard" className="link">
                            <ListItem button>
                                <ListItemIcon>
                                    <LineStyleIcon style={{ fill: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"} />
                            </ListItem>
                        </Link>
                        <Link to="/find" className="link">
                            <ListItem button>
                                <ListItemIcon>
                                    <ShowChartIcon style={{ fill: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Find A Stock"} />
                            </ListItem>
                        </Link>
                        <Link to="/" className="link">
                            <ListItem button onClick={() => {
                                Auth.signout(() => history.push('/'))
                                dispatch({
                                    type: "GET_USER",
                                    payload: {}
                                })
                            }}>
                                <ListItemIcon>
                                    <ExitToAppIcon style={{ fill: 'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItem>
                        </Link>
                        {/* <button className="btn"
                            onClick={() => {
                                Auth.signout(() => history.push('/'))
                                dispatch({
                                    type: "GET_USER",
                                    payload: {}
                                })
                            }}>
                            Logout
			            </button> */}
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path="/find">
                        <FindStock />
                    </Route>
                    <Route exact path="/dashboard">
                        <YourDash />
                    </Route>
                </Switch>

            </div>
        </Router>
    )

}

export default ProtectedRoute