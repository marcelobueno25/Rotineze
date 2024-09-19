import React, { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CardDiario from "./components/CardDiario";
// import { fetchHabits } from "@services/habitService";

export function Home() {
  // const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits) || [];
  // const user = useSelector((state) => state.auth.user);

  // const onRefresh = () => {
  //   dispatch(fetchHabits(user, habits));
  // };

  return (
    <View
      rowGap={15}
      style={{
        flex: 1,
        marginBottom: 80,
        padding: 10,
      }}
    >
      <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
        <CardDiario habits={habits} />
      </ScrollView>
    </View>
  );
}
