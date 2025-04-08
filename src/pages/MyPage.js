import { useLoaderData } from "react-router-dom";
import { fetchMypage } from "../api/httpMemberService";
import { getAuthToken } from '../auth/tokenProviderService';

function MyPage() {

	const data = useLoaderData()
	console.log("MyPage.data: ", data)

	return (
		<div className="container">
			<div className="login">
				<div>
					<label htmlFor="userid">userid:</label>
					<input type="text" name="userid" defaultValue={data.userid} />
				</div>
				<div>
					<label htmlFor="password">password:</label>
					<input type="text" name="passwd" defaultValue={data.passwd} />
				</div>
				<div>
					<label htmlFor="username">username:</label>
					<input type="text" name="username" defaultValue={data.username} />
				</div>
			</div>
		</div>
	);
}

export async function loader() {

	const { token, userid } = getAuthToken();

	var response = await fetchMypage(token);
	console.log("fetchMypage: ", response.data)
	return response.data;

}

export default MyPage;
