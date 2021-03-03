import React from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  my_text: {
    fontSize: 100,
  },
});

// use styles as usual
function List(): JSX.Element {
  return (
    <View>
      <Text>My List</Text>
    </View>
  );
}

export default List;
