

import { fetchSave } from '../api/httpTodoService';
import { getAuthToken } from '../auth/tokenProviderService';
import {
  Form,
  redirect,
  json,
  useActionData
} from 'react-router-dom';

function TodoAdd() {

  // 예외처리
  const data = useActionData();
  console.log("useActionData:", data);


  return (
    <div className="container">
      <h1>Todo Add!</h1>
      <div>
        <Form method="post" >
          {data && data.message && <p>{data.message}</p>}
          <fieldset className="form-group">
            <label>Description</label>
            <input type="search" className="form-control" name="description" />
          </fieldset>
          <fieldset className="form-group">
            <label>Target Date</label>
            <input type="date" className="form-control" name="targetDate" />
          </fieldset>
          <div>
            <button className="btn btn-success m-5">Save</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {


  // 회원가입폼 데이터 얻기
  const data = await request.formData();

  const todo = {
    description: data.get('description'),
    targetDate: data.get('targetDate')

  };

  console.log("todo>>", todo);
  const { token, userid } = getAuthToken();

  var response = null;
  try {
    response = await fetchSave(todo, token);
  } catch (e) {

    if (e.status === 400) {
      console.log("유효성 에러 발생1:", e)
      console.log("유효성 에러 발생2:", e.response.data)
      return e.response.data;
    }
  }
  return redirect('/todos');
}//end action

export default TodoAdd;
