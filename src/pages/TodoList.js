

import { useState } from "react"
import { getAuthToken } from '../auth/tokenProviderService';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import { fetchFindAll, fetchRemove } from "../api/httpTodoService";

function TodoList() {

	const todoList = useLoaderData();
	const navigate = useNavigate()

	const [todos, setTodos] = useState(todoList)

	async function deleteTodo(id) {

		const { token, userid } = getAuthToken();
		const response = await fetchRemove(id, token);
		console.log("deleteTodo.response: ", response)

		if (response.status === 204) {
			//로컬 수정
			var new_todos = todos.filter((row, idx) => row.id !== id)
			setTodos(new_todos)
		}

	}//end deleteTodo


	return (
		<div className="container">
			<h1>Todo List!</h1>
			<div>
				<table className="table">
					<thead>
						<tr>
							<th>아이디</th>
							<th>목표</th>
							<th>완료여부</th>
							<th>목표일자</th>
							<th>삭제</th>
							<th>수정</th>
						</tr>
					</thead>
					<tbody>
						{
							todos.map(
								todo => (
									<tr key={todo.id}>
										<td>{todo.id}</td>
										<td>{todo.description}</td>
										<td>{todo.done.toString()}</td>
										{/* <td>{todo.targetDate.toDateString()}</td> */}
										<td>{todo.targetDate?.toString()}</td>
										<td> <button className="btn btn-warning"
											onClick={() => deleteTodo(todo.id)}
										>Delete</button> </td>
										<td> <button className="btn btn-success"
											onClick={() => navigate(`/todoUpdate/${todo.id}`)}
										>Update</button> </td>
									</tr>
								)
							)
						}
					</tbody>

				</table>
			</div>
			<div className="btn btn-success m-5" onClick={() => navigate("/todoAdd")}>Add New Todo</div>
		</div>


	);
}

export async function loader() {

	const { token, userid } = getAuthToken();


	const response = await fetchFindAll(token);

	return response.data;
}
export default TodoList;
