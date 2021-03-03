import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { BoxShadow } from "react-native-shadow";
// Context
import { UserStatusContext } from "../../../App";
// Component
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export const styles = EStyleSheet.create({
  header_container: {
    backgroundColor: "#ffffff",
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60,
    top: 40,
    width: "100%",
  },
  desktop_header: {
    display: "flex",
  },
  mobile_header: {
    display: "none",
  },

  "@media (min-width: 350px) and (max-width: 1280)": {
    // media queries
    header_container: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    desktop_header: {
      display: "none",
    },
    mobile_header: {
      display: "flex",
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
            <DesktopHeader signOut={signOut} isUser={user} />
          </View>
          <View style={styles.mobile_header}>
            <MobileHeader />
          </View>
        </View>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Header;
