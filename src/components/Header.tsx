import React from "react";
import { Link } from "react-router-native";
import { View, Text, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  menu_container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  menu_link: {
    color: "black",
    fontSize: 20,
    padding: 20,
  },
});

function Header(): JSX.Element {
  return (
    <View style={styles.menu_container}>
      <Link component={TouchableOpacity} to="/">
        <Text style={styles.menu_link}>Home</Text>
      </Link>

      <Link component={TouchableOpacity} to="/list">
        <Text style={styles.menu_link}>List</Text>
      </Link>

      <Link component={TouchableOpacity} to="/profiles">
        <Text style={styles.menu_link}>Profiles</Text>
      </Link>

      <Link component={TouchableOpacity} to="/sign-in">
        <Text style={styles.menu_link}>Sign in</Text>
      </Link>
    </View>
  );
}

export default Header;
