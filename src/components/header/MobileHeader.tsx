import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import EStyleSheet from "react-native-extended-stylesheet";
import SignInUpButton from "./SignInUpButton";

export const styles = EStyleSheet.create({
  flex_container: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu_hamburger: {
    marginLeft: 40,
    height: 46,
    width: 46,
  },
  menu_close: {
    height: 46,
    width: 46,
  },
  logo: {
    height: 46,
    width: 46,
  },
  buttons_container: {
    backgroundColor: "#ffffff",
    marginTop: 20,
  },
  button: {
    height: 46,
    width: 107,
  },
});

interface Props {
  signOut(): void;
  isUser: string;
}

function MobileHeader({ signOut, isUser }: Props): JSX.Element {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <View>
      <View style={styles.flex_container}>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={styles.logo}
            source={require("../../../assets/png/logo.png")}
          />
        </TouchableOpacity>

        {menuIsOpen ? (
          <View>
            <TouchableOpacity
              onPress={() => setMenuIsOpen(!menuIsOpen)}
              activeOpacity={0.8}
            >
              <Image
                style={styles.menu_close}
                source={require("../../../assets/png/close.png")}
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
                source={require("../../../assets/png/hamburger.png")}
              />
            </TouchableOpacity>
          </Link>
        )}
      </View>

      {menuIsOpen && (
        <View style={styles.buttons_container}>
          <SignInUpButton
            onPress={() => setMenuIsOpen(!menuIsOpen)}
            signOut={signOut}
            isUser={isUser}
          />

          <TouchableOpacity activeOpacity={0.8}>
            <Link onPress={() => setMenuIsOpen(!menuIsOpen)} to="/">
              <Text>Home</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Link onPress={() => setMenuIsOpen(!menuIsOpen)} to="/list">
              <Text>List</Text>
            </Link>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default MobileHeader;
