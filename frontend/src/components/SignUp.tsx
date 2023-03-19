import * as React from "react";
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
import { useMutation } from "@apollo/client";
import { SIGN_IN, SIGN_UP } from "../mutations/authMutations";
import { SignUpResponse } from "../types/signUpResponse";
import { SignInResponse } from "../types/signInResponse";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const SignUp = () => {
	const [createUserInput, setCreateUserInput] = React.useState({
		name: "",
		email: "",
		password: "",
	});
	const [signUp] = useMutation<SignUpResponse>(SIGN_UP);
	const [signIn] = useMutation<SignInResponse>(SIGN_IN);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const result = await signUp({
				variables: { createUserInput },
			});

			if (result.data?.createUser) {
				const result = await signIn({
					variables: {
						signInInput: {
							email: createUserInput.email,
							password: createUserInput.password,
						},
					},
				});

				if (result.data) {
					localStorage.setItem("token", result.data.signIn.accessToken);
				}

				localStorage.getItem("token") && navigate("/");
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				alert("ユーザーの作成に失敗しました");
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
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="name"
									name="name"
									required
									fullWidth
									id="name"
									label="Name"
									autoFocus
									value={createUserInput.name}
									onChange={(event) =>
										setCreateUserInput((prev) => ({
											...prev,
											name: event.target.value,
										}))
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={createUserInput.email}
									onChange={(event) =>
										setCreateUserInput((prev) => ({
											...prev,
											email: event.target.value,
										}))
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={createUserInput.password}
									onChange={(event) =>
										setCreateUserInput((prev) => ({
											...prev,
											password: event.target.value,
										}))
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default SignUp;
