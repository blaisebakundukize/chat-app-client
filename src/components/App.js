import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import { handleGetAuthedUser } from "../store/actions/login";
import { handleReceiveRecentChats } from "../store/actions/chat";

const App = () => {
  const { authedUser, chat } = useSelector((state) => {
    const authedUser = state.auth;
    const chat = state.chat;
    return { authedUser, chat };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (authedUser.isAuthenticated === true && authedUser.user === null) {
      dispatch(handleGetAuthedUser());
    }
  }, [authedUser.isAuthenticated, authedUser.user, dispatch]);

  useEffect(() => {
    if (authedUser.isAuthenticated && chat.chats === null) {
      dispatch(handleReceiveRecentChats());
    }
  });

  console.log(chat);

  return (
    <Layout>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/' exact component={Chat} />
      </Switch>
    </Layout>
  );
};

export default App;
