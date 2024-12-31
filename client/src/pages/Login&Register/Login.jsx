import React, { useState } from "react";
import classes from "./Register&Login.module.css";
import { useRef } from "react";
import axios from "../../Components/config/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axiosBase from "../../Components/config/axios";
function Login() {
	const [error, setError] = useState();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	// const emailDom = useRef();
	// const passwordDom = useRef();
	const [emailDom, passwordDom] = Array(2)
		.fill(null)
		.map(() => useRef());
	async function handleSubmit(e) {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		const fields = [
			{ ref: emailDom, value: emailDom.current.value },
			{ ref: passwordDom, value: passwordDom.current.value },
		];

		// Iterate over the fields and apply the red border to the first empty field
		for (let i = 0; i < fields.length; i++) {
			if (!fields[i].value) {
				fields[i].ref.current.style.border = "1px solid red";
				return; // Stop further validation if an empty field is found
			} else {
				fields[i].ref.current.style.border = ""; // Clear border if the field is filled
			}
		}
		try {
			const { data } = await axiosBase.post("/user/login", {
				email: emailValue,
				password: passwordValue,
			});
			setError("");
			localStorage.setItem("token", data.token);
			navigate("/");
			window.location.reload();
		} catch (error) {
			// console.log(error);
			setError(error.response.data.message);
			// console.log(error.response.data.message);
		}
	}

	return (
		<section className={classes.register_and_login_section}>
			<div className={`container mt-5 pt-5`}>
				<div className={`row ${classes.outer_container}`}>
					{/* Login Form Section */}
					<div className=" col-md">
						<div className={classes.login_wrapper}>
							<div className={classes.login_inner_wrapper}>
								<form
									action="/signIn"
									onSubmit={handleSubmit}
									className={classes.login_form}
								>
									{/* Login Heading */}
									<div className={classes.login_heading}>
										<h3>Login to Your Account</h3>
										<p>
											Don't have an account?{" "}
											<Link to="/register" className={classes.link}>
												Create a new account
											</Link>
										</p>
									</div>
									{/* error message */}
									{error && (
										<div style={{ color: "red", textAlign: "center" }}>
											{error}
										</div>
									)}
									{/* Input Fields */}
									<div className={classes.inputBox}>
										<input
											ref={emailDom}
											type="email"
											placeholder="Email Address"
											className={`${classes.usernames} form-control`}
										/>
									</div>
									<div className={classes.password_container}>
										<div className={classes.inputBox}>
											<input
												ref={passwordDom}
												type={showPassword ? "text" : "password"}
												placeholder="Password"
												className={`${classes.usernames} form-control`}
											/>
											<div
												className={classes.showPassword}
												onClick={() => setShowPassword((prev) => !prev)}
											>
												{showPassword ? <FaEye /> : <FaEyeSlash />}
											</div>
										</div>
									</div>
									{/* Forgot Password Link */}
									<div className={classes.forgot_password}>
										<a href="#" className={classes.link}>
											Forgot password?
										</a>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										className={`${classes.login_button} btn btn-primary w-100 py-3 mb-5`}
									>
										Login
									</button>
								</form>
							</div>
						</div>
					</div>

					{/* About Section */}
					<div className="col-md ">
						<div className={classes.about_section}>
							<h4>About</h4>
							<h1>Evangadi Networks</h1>
							<p>
								No matter what stage of life you are in, whether you’re just
								starting elementary school or being promoted to CEO of a Fortune
								500 company, you have much to offer to those who are trying to
								follow in your footsteps.
							</p>
							<p>
								Whether you are willing to share your knowledge or you are just
								looking to meet mentors of your own, please start by joining the
								network here.
							</p>

							{/* How It Works Button */}
							<button className={classes.how_it_works_btn}>
								<a href="#" className={classes.how_it_works_link}>
									How It Works
								</a>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
