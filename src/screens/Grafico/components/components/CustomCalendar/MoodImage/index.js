// MoodImage.js
import React from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";

// Import images for both cats and dogs
const moodImages = {
  cat: {
    bravo: require("@assets/expressionface/cat_bravo.png"),
    normal: require("@assets/expressionface/cat_normal.png"),
    animado: require("@assets/expressionface/cat_animado.png"),
    feliz: require("@assets/expressionface/cat_feliz.png"),
  },
  dog: {
    bravo: require("@assets/expressionface/dog_bravo.png"),
    normal: require("@assets/expressionface/dog_normal.png"),
    animado: require("@assets/expressionface/dog_animado.png"),
    feliz: require("@assets/expressionface/dog_feliz.png"),
  },
};

const MoodImage = ({ completionPercentage }) => {
  const configuration = useSelector((state) => state.configuration);
  const animal = configuration.animal || "cat";

  const getMoodImage = (percentage) => {
    if (percentage === 100) {
      return moodImages[animal].feliz;
    } else if (percentage >= 60) {
      return moodImages[animal].animado;
    } else if (percentage >= 30) {
      return moodImages[animal].normal;
    } else {
      return moodImages[animal].bravo;
    }
  };

  const moodImage = getMoodImage(completionPercentage);

  return (
    <Image
      source={moodImage}
      style={{ position: "absolute", width: 40, height: 40 }}
      resizeMode="contain"
    />
  );
};

export default MoodImage;
