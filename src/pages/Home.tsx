import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

// define extended styles
const styles = EStyleSheet.create({
  column: {
    width: "80%", // 80% of screen width
  },
  text: {
    color: "$textColor", // global variable $textColor
    fontSize: "15px", // relative REM unit
  },
  "@media (min-width: 1000) and (max-width: 1900)": {
    // media queries
    text: {
      fontSize: "30px",
    },
  },
});

// use styles as usual
class Home extends React.Component {
  render() {
    return (
      <View style={styles.column}>
        <Text style={styles.text}>Home</Text>
      </View>
    );
  }
}

export default Home;
