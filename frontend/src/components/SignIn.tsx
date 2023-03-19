import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SignInResponse } from "../types/signInResponse";
import { SIGN_IN } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const SignIn = () => {
	const [signInInput, setSignInInput] = useState({
		email: "",
		password: "",
	});
	const [failSignIn, setFailSignIn] = useState(false);
	const [signIn] = useMutation<SignInResponse>(SIGN_IN);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const result = await signIn({
				variables: { signInInput },
			});

			if (result.data) {
				localStorage.setItem("token", result.data.signIn.accessToken);
			}

			localStorage.getItem("token") && navigate("/");
		} catch (error: unknown) {
			if (error instanceof Error) {
				if (error.message === "Unauthorized") {
					setFailSignIn(true);
					return;
				}

				console.log(error.message);
				alert("予期せぬエラーが発生しました");
			}
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={signInInput.email}
							onChange={(event) =>
								setSignInInput((prev) => ({
									email: event.target.value,
									password: prev.password,
								}))
							}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={signInInput.password}
							onChange={(event) =>
								setSignInInput((prev) => ({
									email: prev.email,
									password: event.target.value,
								}))
							}
						/>
						{failSignIn && (
							<Typography color="red">
								メールアドレスまたはパスワードを確認してください。
							</Typography>
						)}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default SignIn;
