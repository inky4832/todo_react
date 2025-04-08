
import { useEffect, useState } from 'react'
import { getAuthToken } from '../auth/tokenProviderService';
import { useParams, json, useLoaderData, Form, redirect, } from 'react-router-dom'
import { fetchFindById, fetchUpdate } from '../api/httpTodoService';

function TodoUpdate() {


  const { id, description, targetDate, done } = useLoaderData();
  console.log("useLoaderData(): ", useLoaderData())

  const [isDone, setIsDone] = useState(done)

  function handleChange(e) {
    console.log("done: ", e.target.value)
    setIsDone(e.target.value)
  }
  // const [description, setDescription] = useState(xxx.description)
  // const [targetDate, setTargetDate] = useState(xxx.targetDate)

  // console.log("xxx: ", xxx)
  // console.log("description:", description)
  // console.log("targetDate:", targetDate)

  // useEffect 없이 setDescription(xxx.description) 하면 무한반복됨.
  // useEffect(
  //   () => {
  //     setDescription(xxx.description)
  //     setTargetDate(xxx.targetDate)
  //   },
  //   [id]
  // )



  return (
    <div className="container">
      <h1>Todo Update!</h1>
      <div>
        <Form method="post" >
          <fieldset className="form-group">
            <label>ID</label>
            <input type="text" className="form-control" name="id" defaultValue={id} readOnly />
          </fieldset>
          <fieldset className="form-group">
            <label>Description</label>
            <input type="search" className="form-control" name="description" defaultValue={description} />
          </fieldset>
          <fieldset className="form-group">
            <label>Target Date</label>
            <input type="date" className="form-control" name="targetDate" defaultValue={targetDate} />
          </fieldset>
          <fieldset className="form-group">
            <label>Done</label>
            <select name="done" value={isDone} onChange={handleChange}>
              <option >true</option>
              <option >false</option>
            </select>
          </fieldset>
          <div>
            <button className="btn btn-success m-5">update</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function loader({ request, params }) {

  const id = params.id;

  const { token, userid } = getAuthToken();

  const response = await fetchFindById(id, token)

  return response.data;

}//end loader


export async function action({ request }) {


  const { token, userid } = getAuthToken();

  // 회원가입폼 데이터 얻기
  const data = await request.formData();

  const id = data.get('id');
  const todo = {
    description: data.get('description'),
    targetDate: data.get('targetDate'),
    done: data.get('done'),
  };
  console.log("todo>>", todo);


  const response = await fetchUpdate(id, todo, token)

  return redirect('/todos');
}//end action


export default TodoUpdate;
