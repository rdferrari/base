import React, { useState } from "react";
import { View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Link } from "react-router-native";
// Context
import { UserStatusContext } from "../../App";
// Component
import DesktopHeader from "./DesktopHeader";

const styles = EStyleSheet.create({
  header_container: {
    backgroundColor: "white",
    boxShadow: "2px 2px 5px grey",
    left: 0,
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "60px",
    paddingRight: "60px",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  },
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
  desktop_header: {
    display: "iherint",
  },

  "@media (min-width: 350px) and (max-width: 1280)": {
    // media queries
    header_container: {
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    desktop_header: {
      display: "none",
    },
  },
});

interface Props {
  signOut(): void;
}

function Header({ signOut }: Props) {
  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <View style={styles.header_container}>
          <View style={styles.desktop_header}>
            <DesktopHeader styles={styles} signOut={signOut} isUser={user} />
          </View>
        </View>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Header;
