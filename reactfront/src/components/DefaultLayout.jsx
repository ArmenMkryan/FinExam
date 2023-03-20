import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import "../index.css";
import { useEffect } from "react";
import axiosClient from "../axiosClient";

export const DefaultLayout = () => {
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);
  const { user, username, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (event) => {
    event.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/tasks">Tasks</Link>
      </aside>
      <div className="content">
        <header>
          {user && <div className="head">Hello {user.username}</div>}
          <div>
            <a className="btn-logout" href="#" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
