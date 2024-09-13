import React, { useEffect, useCallback, useState } from "react";
import { View, Vibration, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CardDiario from "./components/CardDiario";
import { useFocusEffect } from "@react-navigation/native";
import { fetchHabits } from "@services/habitService";

export function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits) || [];
  const user = useSelector((state) => state.auth.user);

  const loadHabits = useCallback(() => {
    if (user) {
      dispatch(fetchHabits(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [loadHabits])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      loadHabits();
    }, 2000);
  }, []);

  return (
    <View
      rowGap={15}
      style={{
        flex: 1,
        marginBottom: 80,
        padding: 10,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CardDiario habits={habits} />
      </ScrollView>
    </View>
  );
}
