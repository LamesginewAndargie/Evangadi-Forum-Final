import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login&Register/Login";
import Register from "./pages/Login&Register/Register";
import NewQuestion from "./pages/Question/NewQuestion";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Answer from "./pages/Answers/Answer";
import axiosBase from "./Components/config/axios";
export const AppState = createContext();
function App() {
	const [user, setUser] = useState({});
	const token = localStorage.getItem("token");
	const Navigate = useNavigate();
	async function checkUser() {
		try {
			const { data } = await axiosBase.get("/user/checkUser", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setUser(data);
		} catch (error) {
			// console.log(error.response);
			Navigate("/login");
		}
	}
	useEffect(() => {
		checkUser();
	}, []);
	return (
		<AppState.Provider value={{ user, setUser }}>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/newquestion" element={<NewQuestion />} />
				<Route path="/answer/:question_id" element={<Answer />} />
			</Routes>
			<Toaster position="top-right" />
			<Footer />
		</AppState.Provider>
	);
}

export default App;
