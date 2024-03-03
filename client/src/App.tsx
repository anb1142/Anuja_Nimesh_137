import { Button, Typography } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlignCenter from "./components/AlignCenter";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import NewRecipe from "./pages/NewRecipe";
import Profile from "./pages/Profile";
import RecipePage from "./pages/RecipePage";
import Register from "./pages/Register";
import Cookies from "js-cookie";
import { logout } from "./services/auth/auth.service";
function App() {
	const navigate = useNavigate();
	const userCookie = Cookies.get("user");
	return (
		<>
			<AlignCenter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<RecipePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/new"
						element={
							<ProtectedRoute>
								<NewRecipe />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/user/:id/" element={<RecipePage />} />
				</Routes>
			</AlignCenter>

			{/* {userLoading && <Spinner />} */}
			{userCookie ? (
				<Button
					sx={{ position: "fixed", bottom: "1vh", right: "1vh" }}
					onClick={() => {
						logout();
						navigate("/login");
					}}
				>
					Logout
				</Button>
			) : null}

			<ToastContainer />
		</>
	);
}

export default App;
