import { Header } from "./Header";
import { TaskTable } from "./TaskTable";
import { Loading } from "./Loading";
import { Stack, Typography } from "@mui/material";
import { Payload } from "../types/payload";
import { useQuery } from "@apollo/client";
import { GetTasksResponse } from "../types/getTasksResponse";
import { GET_TASKS } from "../queries/taskQueries";
import jwtDecoded from "jwt-decode";
import AddTask from "./AddTask";

const Main = () => {
	const token = localStorage.getItem("token");
	let userId;
	if (token) {
		const decodedToken = jwtDecoded<Payload>(token);
		userId = decodedToken.sub;
	}
	const { loading, data, error } = useQuery<GetTasksResponse>(GET_TASKS, {
		variables: {
			userId,
		},
	});

	return (
		<>
			<Header />
			<Stack spacing={4} direction="column" m={8} alignItems="center">
				{loading && <Loading />}
				{error && <Typography color="red">エラーが発生しました</Typography>}
				{!loading && !error && (
					<>
						<AddTask userId={userId} />
						<TaskTable tasks={data?.getTasks} userId={userId} />
					</>
				)}
			</Stack>
		</>
	);
};

export default Main;
