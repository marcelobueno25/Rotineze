// MoodImage.js
import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";

// Import images for both cats and dogs
const moodImages = {
  cat: {
    superTriste: require("@assets/expressionface/cat_bravo.png"),
    triste: require("@assets/expressionface/cat_normal.png"),
    normal: require("@assets/expressionface/cat_normal.png"),
    feliz: require("@assets/expressionface/cat_animado.png"),
    superFeliz: require("@assets/expressionface/cat_feliz.png"),
  },
  dog: {
    superTriste: require("@assets/expressionface/dog_bravo.png"),
    triste: require("@assets/expressionface/dog_normal.png"),
    normal: require("@assets/expressionface/dog_normal.png"),
    feliz: require("@assets/expressionface/dog_animado.png"),
    superFeliz: require("@assets/expressionface/dog_feliz.png"),
  },
};

const MoodImage = ({ completionPercentage }) => {
  const configuration = useSelector((state) => state.configuration);
  const animal = configuration.animal || "cat";

  const getMoodImage = (percentage) => {
    if (percentage === 100) {
      return moodImages[animal].superFeliz;
    } else if (percentage >= 60) {
      return moodImages[animal].feliz;
    } else if (percentage >= 40) {
      return moodImages[animal].normal;
    } else if (percentage >= 20) {
      return moodImages[animal].triste;
    } else {
      return moodImages[animal].superTriste;
    }
  };

  const moodImage = getMoodImage(completionPercentage);

  return (
    <Image
      source={moodImage}
      style={{ position: "absolute", width: 35, height: 45 }}
      resizeMode="contain"
    />
  );
};

export default MoodImage;
