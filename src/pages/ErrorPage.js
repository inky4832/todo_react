
import './ErrorPage.css'
import MainNavigation from '../components/MenuNavigation';
import { useRouteError } from "react-router-dom";

function ErrorPage() {

  const error = useRouteError();
  console.log("error: ", error);


  let message = '요청하신 페이지를 찾을 수 없습니다. 다시 확인하세요';
  let status = 404;
  let time = null;


  // springboot에서 인증에러시 예외처리임
  if (error.status === 401) {

    message = "인증이 필요한 요청입니다. 로그인후 다시 요청하세요";
    status = error.status;
    time = new Date().toISOString();
  }

  return (
    <>
      <MainNavigation />
      <main className='ErrorPage'>
        <h1>{status} 예외발생</h1>
        <p>{message}</p>
        <p>{time}</p>
      </main>
    </>
  );
}
export default ErrorPage;

