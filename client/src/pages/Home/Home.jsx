import React, { useEffect, useState, useContext } from "react";
import classes from "./home.module.css";
import { Link } from "react-router-dom";
import axiosBase from "../../Components/config/axios";
import QuestionCard from "../Question/QuestionCard";
import { AppState } from "../../App";

function Home() {
	const { user } = useContext(AppState);
	const [searchQuery, setSearchQuery] = useState("");
	const [allquestions, setAllQuestions] = useState([]);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const token = localStorage.getItem("token");
				const allQuestion = await axiosBase.get("/question", {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				setAllQuestions(allQuestion.data.questions);
			} catch (error) {
				// console.error(error);
			}
		};

		fetchQuestions();
	}, [user]);

	const filterdQuestion = allquestions.filter((question) =>
		question.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	// console.log(filterdQuestion);
	return (
		<>
			<div className={classes.home__container__wrapper}>
				<section className="home_container">
					{/* button container for asking questions and welcoming the user  */}
					<div className="row mt-5 mx-auto">
						<p className={classes.username}>
							{/* Welcoming user by username  */}
							welcome: <span>{user.username}</span>
						</p>
						<div className={`col-md ${classes.btn_container}`}>
							<Link to="/newquestion">
								{/* link for ask question button  */}
								<button className={classes.ask_blue}>Ask Question</button>
							</Link>
						</div>
						{/* search input for questions  */}
						<div className={`col-md ${classes.search_container}`}>
							<input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								type="text"
								placeholder="Search question"
								className={`${classes.search_input} form-control`}
							/>
						</div>
						<hr />
					</div>
					{/* horizontal separate line  */}
					<div className={classes.home__QuestionCard_box}>
						<div className={classes.horizontal_line}></div>

						{/* user details section  */}
						{allquestions.length > 0 ? (
							filterdQuestion.map((question, i) => (
								<QuestionCard key={i} Questions={question} />
							))
						) : (
							<p className={classes.no_question}>No Question Found</p>
						)}
					</div>
				</section>
			</div>
		</>
	);
}

export default Home;
