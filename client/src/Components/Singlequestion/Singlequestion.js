import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosBase from "../config/axios";

const Singlequestion = () => {
	const [question, setquestion] = useState([]);
	const { question_id } = useParams();
	const Singlequestionapi = async () => {
		try {
			const response = await axiosBase.get(`/question/:${question_id}`, {
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			// console.log(response.data.question);
			setquestion(response.data.question);
			
		} catch (error) {
			console.log(error);
		}
	};
	
	
	useEffect(() => {
		Singlequestionapi();
	  }, []);
	return {
		question,
		Singlequestionapi
	};
};

export default Singlequestion;
