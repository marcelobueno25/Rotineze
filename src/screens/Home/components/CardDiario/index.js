import React, { memo } from "react";
import HabitCard from "../../../../components/CardHabit";

export default memo(function CardDiario({ habit }) {
  return <HabitCard habit={habit}></HabitCard>;
});
