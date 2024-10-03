import React, { memo, useRef, useMemo } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { StyleSheet, Vibration, View, TouchableOpacity } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkHabit, removeHabit } from "@redux/habitSlice";

const LIST_ITEM_HEIGHT = 70;

const CardDiario = memo(function CardDiario({ habits, selectedDate }) {
  const sortedHabits = useMemo(() => {
    return [...habits].sort((a, b) => {
      const aCompleted = a.checkIns.includes(selectedDate);
      const bCompleted = b.checkIns.includes(selectedDate);

      // Move hábitos completados para o final
      if (aCompleted && !bCompleted) return 1;
      if (!aCompleted && bCompleted) return -1;
      return 0;
    });
  }, [habits, selectedDate]);

  return (
    <View style={styles.container}>
      {sortedHabits.map((habit) => (
        <Item item={habit} key={habit.id} selectedDate={selectedDate} />
      ))}
    </View>
  );
});

const Item = ({ item, selectedDate }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const isCompleted = item.checkIns.includes(selectedDate);
  const swipeableRef = useRef(null);

  const handleEditHabit = () => {
    Vibration.vibrate(100);
    navigation.navigate("EditHabit", { habitId: item.id });
  };

  const handleViewDetails = () => {
    Vibration.vibrate(100);
    navigation.navigate("HabitDetails", { habitId: item.id });
  };

  const handleCheckHabit = () => {
    Vibration.vibrate(100);
    dispatch(checkHabit({ id: item.id, date: selectedDate }));
  };

  const handleDeleteHabit = () => {
    Vibration.vibrate(100);
    dispatch(removeHabit(item.id));
  };

  const leftSwipe = () => (
    <View style={styles.leftSwipeContainer}>
      <TouchableOpacity
        onPress={handleCheckHabit}
        style={[styles.leftSwipeButton, { backgroundColor: colors.success }]}
      >
        <IconButton
          icon="check-circle"
          size={LIST_ITEM_HEIGHT * 0.35}
          style={styles.iconButton}
          iconColor={colors.background}
        />
      </TouchableOpacity>
    </View>
  );

  const rightSwipe = () => (
    <View style={styles.rightSwipeContainer}>
      <TouchableOpacity
        onPress={handleEditHabit}
        style={[
          styles.rightSwipeButton,
          { backgroundColor: colors.background },
        ]}
      >
        <IconButton
          icon="pencil-outline"
          size={LIST_ITEM_HEIGHT * 0.35}
          style={styles.iconButton}
          iconColor={colors.onSurface}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteHabit}
        style={[styles.rightSwipeButton, { backgroundColor: colors.error }]}
      >
        <IconButton
          icon="delete-outline"
          size={LIST_ITEM_HEIGHT * 0.35}
          style={styles.iconButton}
          iconColor={colors.surface}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      childrenContainerStyle={styles.containerItem}
      renderRightActions={rightSwipe}
      renderLeftActions={leftSwipe}
      onSwipeableWillOpen={(direction) => {
        if (direction === "left") {
          handleCheckHabit();
          swipeableRef.current.close();
        }
      }}
      friction={1}
      leftThreshold={10}
      rightThreshold={30}
      overshootLeft={false}
    >
      <TouchableOpacity
        onPress={handleViewDetails}
        activeOpacity={0.5}
        style={[styles.item, { backgroundColor: colors.background }]}
      >
        <View style={styles.itemContent}>
          <IconButton
            icon={item.icon}
            iconColor={isCompleted ? "lightgrey" : item.color}
            size={25}
            style={styles.habitIcon}
          />
          <Text
            style={[
              styles.habitName,
              {
                textDecorationLine: isCompleted ? "line-through" : "none",
                color: isCompleted ? "#999" : colors.onSurface,
              },
            ]}
          >
            {item.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckHabit}
          onLongPress={handleViewDetails}
        >
          <IconButton
            icon={
              isCompleted ? "check-circle" : "checkbox-blank-circle-outline"
            }
            iconColor={isCompleted ? colors.success : "lightgrey"}
            size={24}
            style={{ margin: 0, padding: 0 }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CardDiario;

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
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  habitIcon: {
    borderRadius: 10,
    margin: 0,
  },
  habitName: {
    fontWeight: "bold",
  },
  leftSwipeContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingVertical: 15,
    paddingLeft: 15,
  },
  leftSwipeButton: {
    elevation: 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
  },
  rightSwipeContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingVertical: 15,
    paddingRight: 15,
  },
  rightSwipeButton: {
    elevation: 2,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
  },
  iconButton: {
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
});
