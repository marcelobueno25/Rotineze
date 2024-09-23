import React, { memo, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { StyleSheet, Vibration, View, TouchableOpacity } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkHabit, removeHabit } from "@redux/habitSlice";
import moment from "moment";

const LIST_ITEM_HEIGHT = 70;

export default memo(function CardDiario({ habits, selectedDate }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dateSelected = moment(selectedDate, "DD/MM/YYYY");

  // Filtrar hábitos criados até a data selecionada
  const filteredHabits = habits.filter((habit) => {
    const createdAtDate = moment(habit.createdAt, "DD/MM/YYYY");
    return createdAtDate.isSameOrBefore(dateSelected);
  });

  // Obter dailyRecords do Redux
  const dailyRecords = useSelector((state) => state.habits.dailyRecords);

  // Encontrar o registro diário para a data selecionada
  const formattedDate = selectedDate; // Certifique-se de que selectedDate está no formato "DD/MM/YYYY"
  const dailyRecord = dailyRecords.find(
    (record) => record.date === formattedDate
  );

  // Obter os IDs dos hábitos completados na data selecionada
  const completedHabitsIds = dailyRecord ? dailyRecord.completedHabits : [];

  // Ordenar os hábitos com base na conclusão
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    const aCompleted = completedHabitsIds.includes(a.id);
    const bCompleted = completedHabitsIds.includes(b.id);

    // Move hábitos completados para o final
    if (aCompleted && !bCompleted) return 1;
    if (!aCompleted && bCompleted) return -1;
    return 0;
  });

  return (
    <View style={styles.container}>
      {sortedHabits.map((habit, index) => (
        <Item
          item={habit}
          index={index}
          key={habit.id}
          selectedDate={formattedDate}
          isCompleted={completedHabitsIds.includes(habit.id)}
        />
      ))}
    </View>
  );
});

const Item = ({ item, index, selectedDate, isCompleted }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const date = selectedDate;
  const swipeableRef = useRef(null);

  const handleEditHabit = ({ id }) => {
    Vibration.vibrate(100);
    navigation.navigate("EditHabit", { habitId: id });
  };

  const handleCheckHabit = (habit) => {
    Vibration.vibrate(100);
    dispatch(checkHabit({ id: habit.id, date: date }));
  };

  const handleDeleteHabit = ({ id }) => {
    Vibration.vibrate(100);
    dispatch(removeHabit(id));
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
            iconColor={isCompleted ? "lightgrey" : item.color}
            size={25}
            style={{
              borderRadius: 10,
              margin: 0,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              textDecorationLine: isCompleted ? "line-through" : "none",
              color: isCompleted ? "#999" : colors.onSurface,
            }}
          >
            {item.name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleCheckHabit(item)}>
          <IconButton
            icon={
              isCompleted ? "check-circle" : "checkbox-blank-circle-outline"
            }
            iconColor={isCompleted ? colors.success : "lightgrey"}
            size={24}
            style={{ margin: 0, padding: 0 }}
          />
        </TouchableOpacity>
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
    marginVertical: 5,
  },
});
