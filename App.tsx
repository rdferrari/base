import React, { useState, useEffect, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Text, View } from "react-native";
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";
import EStyleSheet from "react-native-extended-stylesheet";

//Components
import Header from "./src/components/Header";
// Pages
import Home from "./src/pages/Home";
import SignIn from "./src/pages/SignIn";
import ConfirmationUser from "./src/pages/ConfirmationUser";
import SignUp from "./src/pages/SignUp";
import List from "./src/pages/List";

import config from "./aws-exports";
Amplify.configure(config);

export const UserStatusContext = createContext("");

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $actionColor: "#00B995",
  $lightColor: "#ffffff",
  $darkColor: "#000000",
});

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const event = data.payload.event;

      switch (event) {
        case "signIn":
          console.log(`user signed in`);
          getUserData();
          break;
        case "signUp":
          console.log(`user signed up`);
          break;
        case "signOut":
          console.log(`user signed out`);
          setUser(null);
          break;
        case "signIn_failure":
          console.log(
            "Sign in failed. Please, cheack your username and password."
          );
          break;
        case "configured":
          console.log("the Auth module is configured");
          break;
        default:
          console.log("Users state");
      }
    });
  }, []);

  const getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? setUser(user.username) : setUser(null);
    } catch (err) {
      console.log({ err });
    }
  };

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <UserStatusContext.Provider value={user}>
      <NativeRouter>
        <StatusBar style="dark" />
        <Header signOut={signOut} />
        {user && <Text>{user}</Text>}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />

          {user ? (
            <Route path="/sign-in" render={() => <Redirect to="/list" />} />
          ) : (
            <Route path="/sign-in" component={SignIn} />
          )}

          {user ? (
            <Route
              path="/user-confirmation"
              render={() => <Redirect to="/list" />}
            />
          ) : (
            <Route path="/user-confirmation" component={ConfirmationUser} />
          )}

          {user ? (
            <Route path="/sign-up" render={() => <Redirect to="/list" />} />
          ) : (
            <Route path="/sign-up" component={SignUp} />
          )}

          {/* <Route path="/sign-in" component={SignIn} /> */}
          {/* <Route path="/user-confirmation" component={ConfirmationUser} /> */}
          {/* <Route path="/sign-up" component={SignUp} /> */}
        </Switch>
      </NativeRouter>
    </UserStatusContext.Provider>
  );
}

export default App;
