import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Link } from "react-router-native";

export const styles = EStyleSheet.create({
  flex_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 40,
    height: 46,
    width: 107,
  },
  logo: {
    height: 46,
    width: 46,
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
        <TouchableOpacity activeOpacity={0.8}>
          <Image style={styles.logo} source={require("../../svg/logo.svg")} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Link to="/">
            <Text>Home</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Link to="/list">
            <Text>List</Text>
          </Link>
        </TouchableOpacity>
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
