import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
// Context
import { UserStatusContext } from "../../../App";
// Component
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export const styles = EStyleSheet.create({
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
  desktop_header: {
    display: "iherint",
  },
  mobile_header: {
    display: "none",
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
    mobile_header: {
      display: "iherint",
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
