import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import Home from "./src/pages/Home";
import SignIn from "./src/pages/SignIn";
import About from "./src/pages/About";
import AuthPage from "./src/pages/Auth";

import config from "./aws-exports";
Amplify.configure(config);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();

    Hub.listen("auth", (data) => {
      const event = data.payload.event;

      switch (event) {
        case "signIn":
          console.log(`user signed in`);
          break;
        case "signUp":
          console.log(`user signed up`);
          break;
        case "signOut":
          console.log(`user signed out`);
          setUser(null);
          break;
        case "signIn_failure":
          console.log("user sign in failed");
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
      user ? setUser(user) : setUser(null);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <NativeRouter>
      <View>
        <View>
          <Link to="/" underlayColor="#f0f4f7">
            <Text>Home</Text>
          </Link>
          <Link to="/about" underlayColor="#f0f4f7">
            <Text>About</Text>
          </Link>
          <Link to="/auth-page" underlayColor="#f0f4f7">
            <Text>Auth page</Text>
          </Link>
        </View>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/auth-page" component={AuthPage} />
      </View>
    </NativeRouter>
  );
}

export default App;
