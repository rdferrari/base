import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Hero from "../components/Hero";

// use styles as usual
class Home extends React.Component {
  render() {
    return (
      <View>
        <Hero
          video="https://base-media-app.s3-ap-southeast-2.amazonaws.com/hero-video.mp4"
          title="Base"
          text="My tagline"
          media="video"
        />
      </View>
    );
  }
}

export default Home;
