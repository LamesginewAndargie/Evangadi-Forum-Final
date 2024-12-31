import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import Allanswer from "../../Components/Hooks/Allanswer";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import formatTime from "../../Components/formatTime";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { FaPen } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import axiosBase from "../../Components/config/axios";
import css from "./Answer.module.css";
import { useParams } from "react-router-dom";
import Singlequestion from "../../Components/Singlequestion/Singlequestion";

function Answer() {
	const { user } = useContext(AppState);
	const { question_id } = useParams();
	const { question, Singlequestionapi } = Singlequestion();
	const [editAnswers, setEditAnswers] = useState("");
	const [answerFiled, setAnswerFiled] = useState("");
	const { answers, like, setLike, fetchAllAnswers } = Allanswer();
	const [errColor, setErrorColor] = useState("white");
	const { formatTimes } = formatTime();
	const [emoji, setEmoji] = useState(false);

	// send answers
	const sendAnswers = async (e) => {
		e.preventDefault();

		if (!answerFiled) {
			setErrorColor("red");
			toast.error("All fields are required!");
			return;
		}

		try {
			const token = localStorage.getItem("token");
			if (editAnswers) {
				await axiosBase.put(
					`/edit/${editAnswers}`,
					{ answer: answerFiled },
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				toast.success("Answer updated successfully!");
			} else {
				// Add a new answer
				await axiosBase.post(
					`/answers/${question_id}`,
					{ answer: answerFiled },
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				toast.success("Answer posted successfully!");
			}

			fetchAllAnswers();
			setAnswerFiled("");
			setEditAnswers("");
		} catch (error) {
			// console.log(error);
			toast.error("error");
		} finally {
			setErrorColor("");
		}
	};

	//edit answers
	const editAnswer = (answer) => {
		setEditAnswers(answer.answer_id);
		setAnswerFiled(answer.answer);
	};

	//send message using enter keybord
	const handleEnterKey = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			sendAnswers(e);
		}
	};

	// delete answers
	const deleteAnswer = async (answer_id) => {
		const token = localStorage.getItem("token");
		try {
			await axiosBase.delete(`/delete/${answer_id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			toast.success("answer deleted");
			fetchAllAnswers();
		} catch (error) {
			// console.log(error);
			toast.error("failed to delete the answer");
		}
	};

	// add emojis
	const hadleEmojies = (e) => {
		// console.log(e);
		setAnswerFiled([answerFiled, e.emoji].join(""));
	};

	// toggle like icons
	const toggleLike = (id) => {
		setLike((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	// get all questions based on their id
	useEffect(() => {
		fetchAllAnswers();
		Singlequestionapi();
	}, []);

	return (
		<div className={css.answer_wrapper}>
			<div className={css.answer_container}>
				<div className={css.answer_username}>
					<h4>Questions</h4>
					<p className={css.answer_user}>
						Username: <span>{user.username}</span>
					</p>
				</div>
				<h6>
					{
						<p>
							<span className="me-3 text-dark">
								<FaCircleArrowRight style={{ color: "#FE8402" }} />
							</span>

							{question?.title}
							{/* from singleQuestion Routes */}
						</p>
					}

					<p>{question?.description}</p>

					{/* from single page routes */}
				</h6>

				<hr />
				<div>
					<h3 className="text-center mb-4">Answers from the Community</h3>
					<hr />
				</div>
				<div className={css.all_answer_list}>
					{answers.length > 0 ? (
						answers?.map((answer, index) => {
							return (
								<div className={css.answer_from_comminuty} key={index}>
									<div className={css.answers_page}>
										<div className={css.avater_image}>
											<h1>{<FaUserAlt />}</h1>
											<div className={css.time_format}>
												<div className={css.time}>
													<p>{answer.username}</p>
													<span style={{ color: "#FE8402" }}>
														{formatTimes(answer.created_at)}
													</span>
												</div>
											</div>
										</div>
										<div>
											<p>{answer.answer}</p>
										</div>

										<div className={css.edit_icons}>
											{user.id === answer.user_id && (
												<span>
													<FaPen onClick={() => editAnswer(answer)} />
												</span>
											)}

											<span
												onClick={() => toggleLike(answer.answer_id)}
												style={{ color: "blue" }}
											>
												{like[answer.answer_id] ? (
													<BiSolidLike />
												) : (
													<AiOutlineLike />
												)}
											</span>
											{user.id === answer.user_id && (
												<span>
													<MdDelete
														onClick={() => deleteAnswer(answer.answer_id)}
													/>
												</span>
											)}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<h4 className={css.no_answer}>
							<span> No answers yet!</span>
							<br />
							Be the first to share your thoughts and help the community.
						</h4>
					)}
				</div>

				<div className={css.answer_form}>
					<h4 className="text-center mb-5">Answer The Top Questions</h4>
					<form onSubmit={sendAnswers}>
						<textarea
							className="form-control"
							rows="6"
							id="details"
							placeholder="Your Answer"
							name="answer"
							value={answerFiled}
							onChange={(e) => setAnswerFiled(e.target.value)}
							onKeyDown={handleEnterKey}
							onClick={() => setEmoji(false)}
							style={{ border: `2px solid ${errColor}` }}
						></textarea>

						<div className={css.emoji}>
							<div className="main-emoji">
								<MdEmojiEmotions onClick={() => setEmoji((prev) => !prev)} />
							</div>
							<div className="emoji-picker">
								{emoji && <EmojiPicker onEmojiClick={hadleEmojies} />}
							</div>
						</div>

						<button type="submit">
							{editAnswers ? "Edit Your Answer" : "Post Your Answer"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Answer;
