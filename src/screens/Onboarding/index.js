import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CustomButton } from "./components/CustomButton";
import { Pagination } from "./components/Pagination";
import { RenderItem } from "./components/RenderItem";

import anima from "../../assets/antimationsol.json";
import plant from "../../assets/plant.json";
import notepeople from "../../assets/animation1.json";

const data = [
  {
    id: 1,
    animation: anima,
    title: "Bem-vindo ao Rotinize!",
    text: "Organize suas manhãs e atinja suas metas com facilidade. O Rotinize ajuda você a criar e manter hábitos saudáveis todos os dias.",
    textColor: "#333333",
    backgroundColor: "#B3E5FC",
  },
  {
    id: 2,
    animation: plant,
    title: "Crie e Gerencie Hábitos",
    text: "Crie hábitos personalizados com datas, horários e frequências específicas. Seja para exercícios, leitura ou meditação, estamos aqui para ajudar.",
    textColor: "#333333",
    backgroundColor: "#A8D5BA",
  },
  {
    id: 3,
    animation: notepeople,
    title: "Visualize Seu Progresso",
    text: "Use nossos gráficos interativos para acompanhar seu progresso ao longo do tempo e se manter motivado.",
    textColor: "#333333",
    backgroundColor: "#D1C4E9",
  },
];

export const Onboarding = ({ onFinish }) => {
  const flatlistRef = useAnimatedRef();
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const flatlistIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0]?.index !== null) {
      flatlistIndex.value = viewableItems[0]?.index;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          x={x}
          onFinish={onFinish}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
