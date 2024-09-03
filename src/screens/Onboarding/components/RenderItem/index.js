import LottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const RenderItem = ({ item, index, x }) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });
  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale: scale }],
    };
  });
  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.8,
            // marginBottom: 40,
            // marginTop: 20,
          }}
          autoPlay
          loop
        />
      </Animated.View>
      <View style={[styles.texts]}>
        <Text style={[styles.itemTitle, { color: item.textColor }]}>
          {item.title}
        </Text>
        <Text style={[styles.itemText, { color: item.textColor }]}>
          {item.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 200,
    gap: 30,
  },
  texts: { marginBottom: 10, marginHorizontal: 20 },
  itemTitle: {
    textAlign: "center",
    fontSize: 29,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemText: {
    textAlign: "center",
    fontSize: 18,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
