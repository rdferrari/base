import React from "react";
import Amplify from "aws-amplify";
import { Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import Home from "./src/pages/Home";
import SignIn from "./src/pages/SignIn";
import About from "./src/pages/About";

import config from "./aws-exports";
Amplify.configure(config);

function App() {
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
          <Link to="/signin" underlayColor="#f0f4f7">
            <Text>Sign in</Text>
          </Link>
        </View>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signin" component={SignIn} />
      </View>
    </NativeRouter>
  );
}

export default App;
