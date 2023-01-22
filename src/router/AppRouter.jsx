/** Libraries */
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

/** Routes Middlewares */
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

/** Components */
import { LoginPage, RegisterPage } from '../components/auth';
import { HomePage } from '../components/home';

/** Custom hooks */
import { useAuthStore } from '../hooks';


/**
 * In this component we manage the routes of our application 
 * in relation to the views and we put the access middlewares.
 */
export const AppRouter = () => {

	const { uid, checking, StartChecking } = useAuthStore();

	/**
	 * We initialized the checking of user using the accessToken if
	 * that token exist.
	 */
	useEffect(() => {
		StartChecking();
		// eslint-disable-next-line
	}, []);

	/**
	 * While the checking process is carried out, we don't return nothing.
	 */
	if (checking) return;

	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* <Route path="/" element={<Navigate replace to="/" />} /> */}

					<Route
						path="/login"
						element={
							<PublicRoute isAutenticated={!!uid}>
								<LoginPage />
							</PublicRoute>
						}
					/>

					<Route
						path="/register"
						element={
							<PublicRoute isAutenticated={!!uid}>
								<RegisterPage />
							</PublicRoute> 
						}
					/>

					<Route
						path="/"
						element={
							<PrivateRoute isAutenticated={!!uid}>
								<HomePage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	)
}
