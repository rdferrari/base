import React from "react";
import { Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Link } from "react-router-native";

export const styles = EStyleSheet.create({
  button: {
    marginLeft: "40px",
    height: "46px",
    width: "107px",
  },

  "@media (min-width: 350px) and (max-width: 1280)": {
    // media queries
    button: {
      marginLeft: 0,
    },
  },
});

interface Props {
  signOut(): void;
  isUser: string;
}

function SignInUpButton({ signOut, isUser }: Props) {
  return isUser === null ? (
    <TouchableOpacity activeOpacity={0.8}>
      <Image
        style={styles.button}
        source={require("../svg/bt-sign-out.svg")}
        signOut={() => signOut}
      />
    </TouchableOpacity>
  ) : (
    <Link to="/">
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          style={styles.button}
          source={require("../svg/bt-sign-in.svg")}
        />
      </TouchableOpacity>
    </Link>
  );
}

export default SignInUpButton;
