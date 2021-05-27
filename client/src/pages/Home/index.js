import React from 'react'
import { Link } from "react-router-dom";
import AuthButton from "../../components/AuthButton";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import Login from "../../components/Login"
import Register from "../../components/Register"


function Home() {
    return (
        <div>
            <nav>
                <Link className="btn btn-warning" to="/register">Register a New User</Link>
                <AuthButton />
            </nav>
            <div>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </div>
    )
}

export default Home;