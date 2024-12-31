import React, { useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import classes from "../Home/home.module.css";
import { Link } from "react-router-dom";
import formatTime from "../../Components/formatTime";
import OnlineUser from "../../Components/Hooks/OnlineUser";
import { FaCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function QuestionCard({ Questions }) {
	const { online, checkOnline } = OnlineUser();
	const OnlineUsers = online
		.filter((user) => user.status == "online")
		.map((user) => user.user_id);
	// console.log(OnlineUsers);
	// console.log(Questions);
	const { formatTimes } = formatTime();
	const { title, description, username, user_id, question_id, created_at } =
		Questions;
	const isOnline = OnlineUsers.includes(user_id);
	useEffect(() => {
		checkOnline();
	}, []);
	return (
		<div>
			<div className={classes.user_container}>
				<Link to={`/answer/${question_id}`} className={classes.link}>
					<div className={classes.profile_container}>
						<div className={classes.user_icon}>
							<div>
								{isOnline && (
									<small className={classes.online}>
										{<FaCircle size={15} color="lightgreen" />}
									</small>
								)}
							</div>
							<p>
								{" "}
								<FaUser className={classes.account_icon} />
							</p>

							<p>{username}</p>
						</div>
						<p className={classes.question}>{title}</p>
						<div className={classes.angle_icon}>
							<ChevronRightIcon />
							<span>{formatTimes(created_at)}</span>{" "}
						</div>
					</div>
				</Link>
			</div>
			<div className={classes.horizontal_line}>
				<hr />
			</div>
		</div>
	);
}

export default QuestionCard;
