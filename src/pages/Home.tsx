import React from "react";
import { Link } from "react-router-native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Hero from "../components/Hero";

export const styles = EStyleSheet.create({
  page_container: {
    backgroundColor: "#000000",
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#ffffff",
    fontSize: 50,
    marginBottom: 20,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
  },
});

function Home(): JSX.Element {
  return (
    <ScrollView style={styles.page_container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.text}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </Text>
      <Text style={styles.text}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </Text>
      <Text style={styles.text}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </Text>
    </ScrollView>
  );
}

export default Home;
