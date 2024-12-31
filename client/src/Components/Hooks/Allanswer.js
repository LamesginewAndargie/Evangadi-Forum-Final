import React, { useState, useEffect } from "react";
import axiosBase from "../config/axios";
import { useParams } from "react-router-dom";

function Allanswer() {
	const [answers, setAnswers] = useState([]);
	const { question_id } = useParams();
	const [like, setLike] = useState({});

	const fetchAllAnswers = async () => {
		try {
			const token = localStorage.getItem("token");
			const allAnswerList = await axiosBase.get("/answers/allAnswers", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const answerData = allAnswerList.data.allAnswers;
			const allAnswers = answerData.filter(
				(answer) => String(answer.question_id) === question_id
			);
			setAnswers(allAnswers);

			const initialLikes = {};
			allAnswers.forEach((answer) => {
				initialLikes[answer.answer_id] = false; // Assuming all answers start with a 'not liked' state
			});
			setLike(initialLikes);
		} catch (error) {
			// console.log(error);
		}
	};
	useEffect(() => {
		fetchAllAnswers();
	}, [question_id]);

	return { answers, like, setLike, fetchAllAnswers };
}

export default Allanswer;
