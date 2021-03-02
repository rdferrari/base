import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Link } from "react-router-native";

export const styles = EStyleSheet.create({
  flex_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: "40px",
    height: "46px",
    width: "107px",
  },
  logo: {
    height: "46px",
    width: "46px",
  },
});

interface Props {
  signOut(): void;
  isUser: string;
}

function DesktopHeader({ signOut, isUser }: Props) {
  return (
    <View style={styles.flex_container}>
      <View style={styles.flex_container}>
        <Link to="/">
          <TouchableOpacity activeOpacity={0.8}>
            <Image style={styles.logo} source={require("../../svg/logo.svg")} />
          </TouchableOpacity>
        </Link>

        <Link to="/">
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.button}
              source={require("../../svg/bt-home.svg")}
            />
          </TouchableOpacity>
        </Link>

        <Link to="/list">
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.button}
              source={require("../../svg/bt-list.svg")}
            />
          </TouchableOpacity>
        </Link>
      </View>

      <>
        {isUser === null ? (
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.button}
              source={require("../../svg/bt-sign-out.svg")}
              signOut={() => signOut}
            />
          </TouchableOpacity>
        ) : (
          <Link to="/">
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                style={styles.button}
                source={require("../../svg/bt-sign-in.svg")}
              />
            </TouchableOpacity>
          </Link>
        )}
      </>
    </View>
  );
}

export default DesktopHeader;
