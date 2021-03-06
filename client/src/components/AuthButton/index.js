import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import Auth from "../../utils/Auth";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
import "./style.css"



const AuthButton = () => {
	console.log("NAV", Auth.isAuthenticated);

	const [dispatch] = useContext(UserContext);
	const history = useHistory();

	return (
		Auth.isAuthenticated ? (
			<button className="btn btn-danger"
				onClick={() => {
					Auth.signout(() => history.push('/'))
					dispatch({
						type: "GET_USER",
						payload: {}
					})
				}}>
				Logout
			</button>
		) : (
				<Link
					className="btn signBtn"
					to="/login"
				>Sign In
				</Link>
			)
	)
}

export default AuthButton;