import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MenuNavigation";


export default function RootLayout() {

  return (
    <div className="container">
      <MainNavigation />
      <hr />
      <main>
        <Outlet />
      </main>

    </div>
  )
}