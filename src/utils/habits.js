import moment from "moment";

export const getHabitsForDate = (dateString, habits) => {
  const formattedDate = moment(dateString, "YYYY-MM-DD").format("DD/MM/YYYY");

  // Filtra os hábitos cuja data inicial é igual ou anterior à data e (se existir) a data final é posterior ou igual à data
  const filteredHabits = habits.filter((habit) => {
    const habitStartDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    return (
      habitStartDate.isSameOrBefore(dateString, "day") &&
      (!habitEndDate || habitEndDate.isSameOrAfter(dateString, "day"))
    );
  });

  // Calcula hábitos completos e não completos
  const completedHabits = filteredHabits.filter((habit) =>
    habit.checkIns.includes(formattedDate)
  );
  const notCompletedHabits = filteredHabits.filter(
    (habit) => !habit.checkIns.includes(formattedDate)
  );

  // Calcula o total e a porcentagem de conclusão
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

export const getHabitsForMonth = (monthString, habits) => {
  const formattedMonth = moment(monthString, "YYYY-MM-DD").format("MM/YYYY");

  // Filtra os hábitos que têm a data inicial dentro ou antes do mês selecionado e (se existir) não passaram do endDate
  const filteredHabits = habits.filter((habit) => {
    const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    return (
      habitInitialDate.isSameOrBefore(monthString, "month") &&
      (!habitEndDate || habitEndDate.isSameOrAfter(monthString, "month"))
    );
  });

  let completedHabitsCount = 0; // Quantidade de check-ins completados no mês
  let totalHabitDays = 0; // Quantidade de dias de hábitos válidos no mês
  const totalHabitsInMonth = filteredHabits.length; // Total de hábitos ativos no mês

  // Itera por cada hábito e verifica os check-ins para o mês selecionado
  filteredHabits.forEach((habit) => {
    const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    // Filtra os check-ins para o mês específico
    const monthlyCheckIns = habit.checkIns.filter(
      (date) => moment(date, "DD/MM/YYYY").format("MM/YYYY") === formattedMonth
    );

    const daysInMonth = moment(monthString).daysInMonth();

    // Verifica cada dia do mês selecionado para ver se o hábito está ativo e contabiliza dias válidos
    for (let day = 1; day <= daysInMonth; day++) {
      const dayString = moment(monthString).date(day).format("DD/MM/YYYY");
      const currentDate = moment(dayString, "DD/MM/YYYY");

      // Considera apenas dias a partir da `initialDate` e antes ou igual a `endDate` (se existir)
      if (
        currentDate.isSameOrAfter(habitInitialDate, "day") &&
        (!habitEndDate || currentDate.isSameOrBefore(habitEndDate, "day"))
      ) {
        totalHabitDays++; // Contabiliza o dia como válido para o hábito

        if (monthlyCheckIns.includes(dayString)) {
          completedHabitsCount++; // Se o hábito foi concluído neste dia, incrementa o contador
        }
      }
    }
  });

  return {
    month: formattedMonth,
    totalHabitsInMonth,
    completedHabitsCount,
    totalHabitDays,
    completionPercentage:
      totalHabitDays > 0
        ? Math.floor((completedHabitsCount / totalHabitDays) * 100)
        : 0,
  };
};

export const getTopHabitSequencesForMonth = (monthString, habits) => {
  const formattedMonth = moment(monthString, "YYYY-MM-DD").format("MM/YYYY");
  const habitSequences = [];

  habits.forEach((habit) => {
    const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    // Verifica se o hábito está ativo no mês selecionado
    if (
      habitInitialDate.isSameOrBefore(monthString, "month") &&
      (!habitEndDate || habitEndDate.isSameOrAfter(monthString, "month"))
    ) {
      // Filtra e ordena os check-ins dentro do mês selecionado
      const monthlyCheckIns = habit.checkIns
        .filter(
          (date) =>
            moment(date, "DD/MM/YYYY").format("MM/YYYY") === formattedMonth
        )
        .sort((a, b) => moment(a, "DD/MM/YYYY").diff(moment(b, "DD/MM/YYYY")));

      // Calcula a maior sequência de dias consecutivos no mês
      let currentSequence = 1;
      let maxSequence = 0;

      for (let i = 1; i < monthlyCheckIns.length; i++) {
        const prevDate = moment(monthlyCheckIns[i - 1], "DD/MM/YYYY");
        const currDate = moment(monthlyCheckIns[i], "DD/MM/YYYY");

        // Verifica se o dia atual é o próximo dia consecutivo do anterior
        if (currDate.diff(prevDate, "days") === 1) {
          currentSequence++;
        } else {
          // Se a sequência foi interrompida, atualiza o valor máximo e reinicia o contador
          if (currentSequence > 1) {
            maxSequence = Math.max(maxSequence, currentSequence);
          }
          currentSequence = 1;
        }
      }

      // Atualiza a sequência máxima se a última sequência foi a maior
      if (currentSequence > 1) {
        maxSequence = Math.max(maxSequence, currentSequence);
      }

      // Adiciona o hábito e a sequência máxima ao array se a sequência for maior que 1
      if (maxSequence > 1) {
        habitSequences.push({
          habit,
          maxSequence,
        });
      }
    }
  });

  // Ordena os hábitos por maior sequência e seleciona os top 3
  const top3Habits = habitSequences
    .sort((a, b) => b.maxSequence - a.maxSequence)
    .slice(0, 3);

  return top3Habits;
};
