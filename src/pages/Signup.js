
import './Signup.css';
import {
  Form,
  redirect,
  useActionData
} from 'react-router-dom';

import { fetchSignup } from '../api/httpMemberService';

function Signup() {

  // 예외처리
  const responseErrorData = useActionData();
  console.log("useActionData:", responseErrorData);

  return (
    <div className="container">
      <div className="signup">
        <div>
          <Form method="post" >
            {responseErrorData && responseErrorData.message}
            <div>
              <label htmlFor="userid">userid:</label>
              <input type="text" name="userid" id="userid" />
            </div>
            <div>
              <label htmlFor="password">password:</label>
              <input type="password" name="passwd" id="password" defaultValue={1234} />

            </div>
            <div>
              <label htmlFor="username">username:</label>
              <input type="text" name="username" id="username" />
            </div>
            <div>
              <button name="signup" className="btn btn-success m-5" >signup</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {

  // 회원가입폼 데이터 얻기
  const data = await request.formData();
  const authData = {
    userid: data.get('userid'),
    passwd: data.get('passwd'),
    username: data.get("username")
  };
  console.log("authData>>", authData);

  var response = null;
  try {
    response = await fetchSignup(authData);
    console.log("action.response>:", response)
  } catch (e) {
    console.log(">>>>>>>>>>>>>>>>>ERROR", e)

    if (e.status === 400) {
      console.log("유효성 에러 발생1:", e)
      console.log("유효성 에러 발생2:", e.response.data)
      return e.response.data;
    }

    if (e.status === 500) {
      console.log("id 중복에러 발생:", e)
      console.log("id 중복에러 발생2:", e.response.data)
      return e.response.data;
    }

  }

  return redirect('/');
}//end action

export default Signup;
