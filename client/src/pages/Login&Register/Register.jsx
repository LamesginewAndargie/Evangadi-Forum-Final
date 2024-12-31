import React, { useState } from "react";
import classes from "./Register&Login.module.css";
import { useRef } from "react";
import axiosBase from "../../Components/config/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Register() {
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [userNameDom, firstNameDom, lastNameDom, emailDom, passwordDom] = Array(
		5
	)
		.fill(null)
		.map(() => useRef());

	async function handleSubmit(e) {
		e.preventDefault();
		const userNameValue = userNameDom.current.value;
		const firstNameValue = firstNameDom.current.value;
		const lastNameValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		const fields = [
			{ ref: userNameDom, value: userNameDom.current.value },
			{ ref: firstNameDom, value: firstNameDom.current.value },
			{ ref: lastNameDom, value: lastNameDom.current.value },
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
			await axiosBase.post("/user/register", {
				username: userNameValue,
				first_name: firstNameValue,
				last_name: lastNameValue,
				email: emailValue,
				password: passwordValue,
			});
			navigate("/login");
		} catch (error) {
			setError(error.response.data.message);
			// console.log(error.response);
		}
	}

	return (
		<section className={classes.register_and_login_section}>
			<div className={`container mt-5 pt-5 ${classes.shared_form_container}`}>
				<div className={`row ${classes.outer_container}`}>
					{/* Register Form */}
					<div className="col-md">
						<div className={classes.shared_form_wrapper}>
							<div className={classes.shared_form_inner_wrapper}>
								<form
									action="/SignUp"
									onSubmit={handleSubmit}
									className={classes.shared_form}
								>
									<div className={classes.shared_form_heading}>
										<h3>Join the Network</h3>
										<p>
											Already have an account?{" "}
											<Link to="/login" className={classes.link}>
												Log in
											</Link>
										</p>
									</div>
									{/* Error */}
									{error && (
										<div className={classes.error}>
											<small style={{ color: "red", textAlign: "center" }}>
												{error}
											</small>
										</div>
									)}
									{/* Input Fields */}
									<div className={`mb-3 ${classes.inputBox}`}>
										<input
											ref={userNameDom}
											type="text"
											placeholder="Username"
											className={`${classes.usernames} form-control`}
										/>
									</div>

									<div className={`row mb-3 ${classes.halves}`}>
										<div
											className={`col-12 col-md-6 mb-3 mb-md-0 ${classes.inputBox}`}
										>
											<input
												ref={firstNameDom}
												type="text"
												placeholder="First Name"
												className={`${classes.usernames} form-control`}
											/>
										</div>
										<div className={`col-12 col-md-6 ${classes.inputBox}`}>
											<input
												ref={lastNameDom}
												type="text"
												placeholder="Last Name"
												className={`${classes.usernames} form-control`}
											/>
										</div>
									</div>

									<div className={`mb-3 ${classes.inputBox}`}>
										<input
											ref={emailDom}
											type="email"
											placeholder="Email Address"
											className={`${classes.usernames} form-control`}
										/>
									</div>
									<div className={classes.password_container}>
										<div className={`mb-3 ${classes.inputBox}`}>
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

									<div className={classes.privacy_terms}>
										<p>
											I agree to the{" "}
											<a href="#" className={classes.link}>
												Privacy Policy
											</a>{" "}
											and{" "}
											<a href="#" className={classes.link}>
												Terms of Service
											</a>
										</p>
									</div>

									<button
										type="submit"
										className={`btn btn-primary w-100 py-3 ${classes.submit_btn}`}
									>
										Agree and Join
									</button>

									<div className={classes.already_account}>
										<Link to="/login" className={classes.link}>
											Already have an account?
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>

					{/* About Section */}
					<div className="col-md">
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

export default Register;
