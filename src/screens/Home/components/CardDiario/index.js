import React, { memo, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { StyleSheet, Vibration, View, TouchableOpacity } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native"; // Importa o hook

const LIST_ITEM_HEIGHT = 70;

export default memo(function CardDiario({ habits }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {habits.map((habit, index) => (
          <Item item={habit} index={index} />
        ))}
      </View>
    </ScrollView>
  );
});

const Item = ({ item, index }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const today = moment().format("DD/MM/YYYY");
  const isToday = item.completedDates.some((date) => date === today);
  const swipeableRef = useRef(null);

  const handleEditHabit = ({ id }) => {
    Vibration.vibrate(100);
    navigation.navigate("EditHabit", { habitId: id });
  };

  const handleCheckHabit = ({ id }) => {
    Vibration.vibrate(100);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: { id },
    });
  };

  const handleDeleteHabit = ({ id }) => {
    Vibration.vibrate(100);
    dispatch({ type: "REMOVE_HABIT", payload: id });
  };

  const leftSwipe = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingVertical: 15,
          paddingLeft: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#4CAF50",
            elevation: 2,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            borderRadius: 10,
          }}
        >
          <View>
            <IconButton
              icon="check-circle"
              size={LIST_ITEM_HEIGHT * 0.35}
              style={{ marginLeft: 0, marginRight: 0, padding: 0 }}
              iconColor={colors.background}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const rightSwipe = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingVertical: 15,
          paddingRight: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => handleEditHabit(item)}
          style={{
            backgroundColor: colors.background,
            elevation: 2,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            borderRadius: 10,
          }}
        >
          <View>
            <IconButton
              icon="pencil-outline"
              size={LIST_ITEM_HEIGHT * 0.35}
              style={{ marginLeft: 0, marginRight: 0, padding: 0 }}
              iconColor={colors.onSurface}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteHabit(item)}
          style={{
            backgroundColor: colors.error,
            elevation: 2,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            borderRadius: 10,
          }}
        >
          <View>
            <IconButton
              icon="delete-outline"
              size={LIST_ITEM_HEIGHT * 0.35}
              style={{ marginLeft: 0, marginRight: 0, padding: 0 }}
              iconColor={colors.surface}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      key={index}
      ref={swipeableRef}
      childrenContainerStyle={styles.containerItem}
      renderRightActions={rightSwipe}
      renderLeftActions={leftSwipe}
      onSwipeableWillOpen={(direction) => {
        if (direction === "left") {
          handleCheckHabit(item);
          swipeableRef.current.close();
        }
      }}
      friction={1}
      dragOffsetFromLeftEdge={20}
      dragOffsetFromRightEdge={40}
      leftThreshold={10}
      rightThreshold={30}
      overshootLeft={false}
    >
      <View
        style={[
          styles.item,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <IconButton
            icon={item.icon}
            iconColor={item.color}
            size={40}
            style={{
              borderRadius: 10,
              margin: 0,
            }}
          />
          <View>
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: `${isToday ? "line-through" : "none"}`,
                color: `${isToday ? "#999" : colors.onSurface}`,
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                textDecorationLine: `${isToday ? "line-through" : "none"}`,
                color: `${isToday ? "#999" : colors.onSurface}`,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <IconButton
              icon={`${
                isToday ? "check-circle" : "checkbox-blank-circle-outline"
              }`}
              iconColor={`${isToday ? item.color : "lightgrey"}`}
              size={24}
              onPress={() => handleCheckHabit(item)}
              style={{ margin: 0, padding: 0 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  item: {
    flex: 1,
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
