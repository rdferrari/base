import React from "react";
import { View, Image, Text, Button, TouchableOpacity } from "react-native";
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
          <TouchableOpacity activeOpacity={0.8}>
            <Image style={styles.logo} source={require("../svg/logo.svg")} />
          </TouchableOpacity>
        </Link>

        <Link to="/">
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.button}
              source={require("../svg/bt-home.svg")}
            />
          </TouchableOpacity>
        </Link>

        <Link to="/list">
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.button}
              source={require("../svg/bt-list.svg")}
            />
          </TouchableOpacity>
        </Link>
      </View>

      <>
        {isUser === null ? (
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
        )}
      </>
    </View>
  );
}

export default DesktopHeader;
