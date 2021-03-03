import React from "react";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const authedUser = useSelector((state) => state.auth);

  // const isAuthenticated = true;
  let logoutBlock = null;
  if (authedUser.isAuthenticated) {
    logoutBlock = (
      <button className='logout' onClick={() => console.log("logout")}>
        Logout
      </button>
    );
  }
  return (
    <div className='container'>
      <header className='header'>
        <h1>Chat app</h1>
        {logoutBlock}
      </header>
      <section className='main'>{props.children}</section>
    </div>
  );
};

export default Layout;
