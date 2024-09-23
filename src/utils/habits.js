import moment from "moment";

export const getHabitsForDate = (dateString, habits) => {
  const formattedDate = moment(dateString, "YYYY-MM-DD").format("DD/MM/YYYY");
  const filteredHabits = habits.filter((habit) =>
    moment(habit.initialDate, "DD/MM/YYYY").isSameOrBefore(dateString, "day")
  );
  const completedHabits = filteredHabits.filter((habit) =>
    habit.checkIns.includes(formattedDate)
  );
  const notCompletedHabits = filteredHabits.filter(
    (habit) => !habit.checkIns.includes(formattedDate)
  );
  const totalHabits = filteredHabits.length;
  const completionPercentage =
    totalHabits > 0
      ? Math.floor((completedHabits.length / totalHabits) * 100)
      : 0;
  return {
    date: formattedDate,
    totalHabits,
    completedHabits,
    notCompletedHabits,
    completionPercentage,
  };
};
