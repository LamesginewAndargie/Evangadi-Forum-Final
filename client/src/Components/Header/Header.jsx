import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";

function Header() {
	const token = localStorage.getItem("token");
	const { user, setUser } = useContext(AppState);
	const logOut = () => {
		localStorage.removeItem("token");
		setUser({});
	};
	return (
		<div className={classes.outerContainer}>
			<div className={classes.container}>
				<div>
					<Link to={token && "/"}>
						<img
							src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
							alt="evangadi logo"
						/>
					</Link>
				</div>
				<div className={classes.menu}>
					<CiMenuBurger color="black" size={30} />
				</div>
				<div className={classes.link_container}>
					<ul>
						<li>
							<Link to={token && "/"}>Home </Link>
						</li>
						<li>
							<a href="">How it works</a>
						</li>
						<li className={classes.auth}>
							{token ? (
								<Link to="/login" onClick={logOut}>
									Log out
								</Link>
							) : (
								<Link to="/login">Log in</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;
