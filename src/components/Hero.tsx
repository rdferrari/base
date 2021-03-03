import React from "react";
import { Link } from "react-router-native";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Video } from "expo-av";
import EStyleSheet from "react-native-extended-stylesheet";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

console.log(ScreenHeight);

export const styles = EStyleSheet.create({
  hero_container: {
    position: "relative",
  },
  mask: {
    backgroundColor: "black",
    height: ScreenHeight,
    position: "absolute",
    opacity: 0.55,
    width: "100%",
    zIndex: 99,
  },

  background_video: {
    height: ScreenHeight,
    zIndex: 98,
  },

  tagline_container: {
    bottom: 250,
    left: 60,
    position: "absolute",
    zIndex: 100,
  },
  title: {
    color: "white",
    fontSize: 150,
    fontWeight: "800",
  },
  tagline: {
    color: "white",
    fontSize: 30,
    fontWeight: "200",
  },

  bt_explore: {
    marginTop: 20,
    height: 46,
    width: 166,
  },

  "@media (min-width: 350px) and (max-width: 1280)": {
    // media queries
    tagline_container: {
      bottom: 142,
      left: 20,
    },
    title: {
      fontSize: 100,
    },
  },
});

interface Props {
  video: string;
  title: string;
  text: string;
}

function Hero({ video, title, text }: Props): JSX.Element {
  console.log(ScreenWidth);

  return (
    <View style={styles.hero_container}>
      <View style={styles.mask}></View>

      <Video
        isLooping
        isMuted
        positionMillis={500}
        resizeMode="cover"
        shouldPlay
        source={{
          uri: `${video}`,
        }}
        rate={1.0}
        style={styles.background_video}
      />

      <View style={styles.tagline_container}>
        {ScreenWidth > 600 && <Text style={styles.tagline}>Maior que 600</Text>}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.tagline}>{text}</Text>
        <Link to="/list">
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              style={styles.bt_explore}
              source={require("../../assets/svg/bt-explore.svg")}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

export default Hero;
