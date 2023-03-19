import Main from "./components/Main";
import NotFound from "./components/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SingUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { GuestRoute, PrivateRoute } from "./AuthRoute";
import client from "./ApolloClient";

function App() {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/signin"
						element={<GuestRoute children={<SignIn />} />}
					/>
					<Route
						path="/signup"
						element={<GuestRoute children={<SignUp />} />}
					/>
					<Route path="/" element={<PrivateRoute children={<Main />} />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
