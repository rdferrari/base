import React from "react";
import { View, Image } from "react-native";
import { Link } from "react-router-native";

interface Props {
  signOut(): void;
  isUser: string;
  styles: {
    flex_container: string;
    logo: string;
    button: string;
  };
}

function DesktopHeader({ signOut, isUser, styles }: Props) {
  return (
    <View style={styles.flex_container}>
      <View style={styles.flex_container}>
        <Link to="/">
          <Image style={styles.logo} source={require("../svg/logo.svg")} />
        </Link>
        <Link to="/">
          <Image style={styles.button} source={require("../svg/bt-home.svg")} />
        </Link>
        <Link to="/list">
          <Image style={styles.button} source={require("../svg/bt-list.svg")} />
        </Link>
      </View>

      <>
        {isUser === null ? (
          <Image
            style={styles.button}
            source={require("../svg/bt-sign-out.svg")}
            signOut={() => signOut}
          />
        ) : (
          <Link to="/sign-in">
            <Image
              style={styles.button}
              source={require("../svg/bt-sign-in.svg")}
            />
          </Link>
        )}
      </>
    </View>
  );
}

export default DesktopHeader;
