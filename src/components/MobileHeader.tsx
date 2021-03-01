import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import EStyleSheet from "react-native-extended-stylesheet";
import SignInUpButton from "./SignInUpButton";

export const styles = EStyleSheet.create({
  flex_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu_hamburger: {
    marginLeft: "40px",
    height: "46px",
    width: "46px",
  },
  menu_close: {
    float: "right",
    height: "46px",
    width: "46px",
  },
  logo: {
    height: "46px",
    width: "46px",
  },
  buttons_container: {
    marginTop: "20px",
  },
  button: {
    height: "46px",
    width: "107px",
  },
});

interface Props {
  signOut(): void;
  isUser: string;
}

function MobileHeader({ signOut, isUser }: Props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <View style={styles.mobile_header}>
      <View style={styles.flex_container}>
        <Link to="/">
          <TouchableOpacity activeOpacity={0.8}>
            <Image style={styles.logo} source={require("../svg/logo.svg")} />
          </TouchableOpacity>
        </Link>

        {menuIsOpen ? (
          <View>
            <TouchableOpacity
              onPress={() => setMenuIsOpen(!menuIsOpen)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.menu_close}
                source={require("../svg/bt-close.svg")}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Link to="/">
            <TouchableOpacity
              onPress={() => setMenuIsOpen(!menuIsOpen)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.menu_hamburger}
                source={require("../svg/menu-hamburger.svg")}
              />
            </TouchableOpacity>
          </Link>
        )}
      </View>

      {menuIsOpen && (
        <View style={styles.buttons_container}>
          <SignInUpButton signOut={signOut} isUser={isUser} />
          <Link to="/">
            <TouchableOpacity
              onPress={() => setMenuIsOpen(!menuIsOpen)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.button}
                source={require("../svg/bt-home.svg")}
              />
            </TouchableOpacity>
          </Link>

          <Link to="/list">
            <TouchableOpacity
              onPress={() => setMenuIsOpen(!menuIsOpen)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.button}
                source={require("../svg/bt-list.svg")}
              />
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}

export default MobileHeader;
