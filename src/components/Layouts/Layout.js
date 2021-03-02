import React from "react";

const Layout = (props) => {
  const isAuthenticated = true;
  let logoutBlock = null;
  if (isAuthenticated) {
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
