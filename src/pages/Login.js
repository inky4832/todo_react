
import './Login.css';

import {
  Form,
  redirect,
  json,
  useActionData
} from 'react-router-dom';

import { fetchAuthenticate } from '../api/httpMemberService';

function Login() {

  // 예외처리 
  const data = useActionData();
  console.log("useActionData:", data);


  return (
    <div className="container">
      <div className="login">
        {data && <p>{data.message}</p>}
        <Form method="post">
          <div>
            <label htmlFor="userid">userid:</label>
            <input type="text" name="userid" />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input type="password" name="passwd" defaultValue="1234" />

          </div>
          <div>
            <button name="login" className="btn btn-success m-5" >login</button>
          </div>
        </Form>
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
  };
  console.log("authData>>", authData);

  let response = null;

  try {
    response = await fetchAuthenticate(authData);

    console.log("로그인 요청결과:", response);
    const token = response.data.token;
    localStorage.setItem('jwtAuthToken', token);
    localStorage.setItem('userid', authData.userid);

  } catch (e) {

    if (e.status === 400) {
      console.log("id 또는 비번  에러 발생1:", e)
      console.log("id 또는 비번  에러 발생2:", e.response.data)
      return { message: e.response.data };  // 현재 컴포넌트에서 useActionData()로 처리함.
    }
  }

  return redirect('/');

}//end action


export default Login;
