import React from "react";
import {
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native"; // Importa o hook
import { useDispatch } from "react-redux";
import { setHasSeenOnboarding } from "@redux/authSlice";

export const CustomButton = ({ flatlistRef, flatlistIndex, dataLength, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        flatlistIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatlistIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#03A9F4", "#4CAF50", "#7E57C2"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
          flatlistRef.current?.scrollToIndex({
            index: flatlistIndex.value + 1,
          });
        } else {
          navigation.navigate("Home");
          dispatch(setHasSeenOnboarding());
        }
      }}
    >
      <Animated.View
        style={[styles.containerArrow, animatedColor, buttonAnimationStyle]}
      >
        <Animated.Text style={[styles.textButton, textAnimation]}>
          Começar
        </Animated.Text>
        <Animated.Image
          source={require("../../../../assets/right-arrow.png")}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerArrow: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  arrow: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  textButton: {
    color: "black",
    fontSize: 16,
    position: "absolute",
    fontWeight: "bold",
    color: "#ffffff",
  },
});
