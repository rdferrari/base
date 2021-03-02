import React from "react";
import { View, Text, Image } from "react-native";
import { Video } from "expo-av";
import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
  hero_container: {
    position: "relative",
  },
  mask: {
    backgroundColor: "black",
    height: "100vh",
    position: "absolute",
    opacity: 0.55,
    width: "100%",
    zIndex: -81,
  },
  media_container: {
    display: "inherit",
    objectFit: "cover",
    left: 0,
    height: "90vh",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: -100,
  },

  background_video: {
    height: "100vh",
    zIndex: -90,
  },

  tagline_container: {
    bottom: "120px",
    color: "white",
    left: "20px",
    position: "absolute",
    zIndex: -80,
  },
  title: {
    color: "white",
    fontSize: "56px",
  },
  tagline: {
    color: "white",
    fontSize: "30px",
  },

  "@media (min-width: 350px) and (max-width: 1280)": {
    // media queries
    tagline_container: {
      bottom: "142px",
      left: "72px",
    },
    title: {
      fontSize: "80px",
    },
    tagline: {
      fontSize: "50px",
    },
  },
});

interface Props {
  video?: string;
  image?: string;
  title?: string;
  text?: string;
  media: string;
}

function Hero({ video, image, title, text, media }: Props) {
  return (
    <div>
      <View style={styles.hero_container}>
        <View style={styles.mask}></View>
        {media === "video" ? (
          <>
            <Video
              isLooping
              isMuted
              positionMillis={500}
              resizeMode="cover"
              shouldPlay
              source={{
                uri: `${video}`,
              }}
              style={styles.background_video}
            />
          </>
        ) : (
          <>
            <Image style={styles.media_container} source={require(image)} />
          </>
        )}

        <View style={styles.tagline_container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tagline}>{text}</Text>
        </View>
      </View>
    </div>
  );
}

export default Hero;
