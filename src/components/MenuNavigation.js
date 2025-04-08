
import { Link, useRouteLoaderData, Form, NavLink } from "react-router-dom";
import './MenuNavigation.css'

export default function MainNavigation() {

    const { token, userid } = useRouteLoaderData('root');
    console.log("MainNavigation.token", token);

    return (
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">

                        {!token &&
                            <>
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav">

                                        <li className="nav-item">
                                            <NavLink className={({ isActive }) =>
                                                isActive ? 'menu' : 'link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'} to="/" >
                                                Home</NavLink>
                                        </li>
                                    </ul>
                                </div>

                                <Link className="nav-link" to="/login">Login</Link>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                </ul>
                            </>
                        }


                        {token &&
                            <>
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav">

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/" >Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/todos">Todos</Link>
                                        </li>
                                    </ul>
                                </div>

                                {userid}

                                &nbsp;
                                <Form action="/logout" method="post">
                                    <button className='nav-link' >Logout</button>
                                </Form>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/mypage">Mypage</Link>
                                    </li>
                                </ul>
                            </>
                        }







                    </nav>
                </div>
            </div>
        </header >



    )
}