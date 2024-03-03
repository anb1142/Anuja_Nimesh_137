import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarContainer from "./components/containers/NavbarContainer";
import ProtectedRoute from "./components/containers/ProtectedRoute";
import AlignCenter from "./components/presentations/AlignCenter";
import Spinner from "./components/presentations/Spinner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { authActions, useAuth } from "./store/auth/auth.slice";
import http from "./utils/http";
function App() {
	const { isLoading: userLoading, user } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const confirmUser = useCallback(async () => {
		if (!userLoading && !!user?.token) {
			try {
				await http.get(`/users/me`);
			} catch (error) {
				dispatch(authActions.reset());
				navigate("/login");
			}
		}
	}, [userLoading, user]);

	useEffect(() => {
		confirmUser();
	}, [confirmUser]);

	return (
		<>
			<NavbarContainer />
			<AlignCenter>
				<Routes>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					></Route>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
				</Routes>
			</AlignCenter>

			{userLoading && <Spinner />}

			<ToastContainer />
		</>
	);
}

export default App;
