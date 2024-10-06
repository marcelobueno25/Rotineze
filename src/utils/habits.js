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
  const totalHabits = filteredHabits?.length;
  const completionPercentage =
    totalHabits > 0
      ? Math.floor((completedHabits?.length / totalHabits) * 100)
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
  const monthMoment = moment(monthString, "DD/MM/YYYY");
  const startOfMonth = monthMoment.clone().startOf("month");
  const endOfMonth = monthMoment.clone().endOf("month");

  // Filtra os hábitos ativos no mês selecionado
  const filteredHabits = habits.filter((habit) => {
    const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    return (
      habitInitialDate.isSameOrBefore(endOfMonth, "day") &&
      (!habitEndDate || habitEndDate.isSameOrAfter(startOfMonth, "day"))
    );
  });

  let completedHabitsCount = 0; // Quantidade de check-ins concluídos no mês
  let totalExpectedHabitDays = 0; // Quantidade total de dias esperados para os hábitos no mês

  filteredHabits.forEach((habit) => {
    const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
    const habitEndDate = habit.endDate
      ? moment(habit.endDate, "DD/MM/YYYY")
      : null;

    // Calcula o intervalo de datas em que o hábito está ativo no mês selecionado
    const habitStartInMonth = moment.max(habitInitialDate, startOfMonth);
    const habitEndInMonth = habitEndDate
      ? moment.min(habitEndDate, endOfMonth)
      : endOfMonth;

    // Calcula o total de dias que o hábito deveria ser praticado neste mês
    const daysActive = habitEndInMonth.diff(habitStartInMonth, "days") + 1; // +1 para incluir o dia final

    if (daysActive > 0) {
      totalExpectedHabitDays += daysActive;

      // Filtra os check-ins que estão dentro do intervalo de atividade do hábito neste mês
      const monthlyCheckIns = habit.checkIns.filter((date) => {
        const checkInDate = moment(date, "DD/MM/YYYY");
        return (
          checkInDate.isSameOrAfter(habitStartInMonth, "day") &&
          checkInDate.isSameOrBefore(habitEndInMonth, "day")
        );
      });

      completedHabitsCount += monthlyCheckIns?.length;
    }
  });

  const totalHabitDays = totalExpectedHabitDays - completedHabitsCount; // Dias restantes para concluir os hábitos
  const totalHabitsInMonth = filteredHabits?.length; // Total de hábitos ativos no mês

  // Cálculo da porcentagem de conclusão sem casas decimais
  const completionPercentage =
    totalExpectedHabitDays > 0
      ? Math.round((completedHabitsCount / totalExpectedHabitDays) * 100)
      : 0;

  return {
    totalHabitsInMonth,
    totalExpectedHabitDays,
    completedHabitsCount,
    totalHabitDays,
    completionPercentage,
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

      for (let i = 1; i < monthlyCheckIns?.length; i++) {
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

export const getHabitStatsForMonth = (dateString, habit) => {
  const formattedMonth = moment(dateString, "YYYY-MM-DD").format("MM/YYYY");

  // Encontra o hábito correspondente pelo ID

  if (!habit) {
    return {
      error: "Hábito não encontrado",
    };
  }

  const habitInitialDate = moment(habit.initialDate, "DD/MM/YYYY");
  const habitEndDate = habit.endDate
    ? moment(habit.endDate, "DD/MM/YYYY")
    : null;

  // Filtra os check-ins do hábito para o mês selecionado
  const monthlyCheckIns = habit.checkIns
    .filter(
      (date) => moment(date, "DD/MM/YYYY").format("MM/YYYY") === formattedMonth
    )
    .sort((a, b) => moment(a, "DD/MM/YYYY").diff(moment(b, "DD/MM/YYYY")));

  let completedHabitsCount = 0; // Quantidade de check-ins concluídos no mês
  let notCompletedHabitsCount = 0; // Quantidade de hábitos não completados no mês
  let maxSequence = 0; // Maior sequência de dias consecutivos
  let totalHabitDays = 0; // Total de dias válidos no mês para o hábito

  // Verifica cada dia do mês e contabiliza hábitos completos e incompletos
  const daysInMonth = moment(dateString).daysInMonth();
  let currentSequence = 0; // Sequência atual de check-ins consecutivos

  for (let day = 1; day <= daysInMonth; day++) {
    const dayString = moment(dateString).date(day).format("DD/MM/YYYY");
    const currentDate = moment(dayString, "DD/MM/YYYY");

    // Considera apenas dias dentro do intervalo de `initialDate` e `endDate` (se existir)
    if (
      currentDate.isSameOrAfter(habitInitialDate, "day") &&
      (!habitEndDate || currentDate.isSameOrBefore(habitEndDate, "day"))
    ) {
      totalHabitDays++; // Conta o dia como válido para o hábito

      if (monthlyCheckIns.includes(dayString)) {
        completedHabitsCount++; // Se o hábito foi concluído neste dia, incrementa o contador
        currentSequence++; // Incrementa a sequência de check-ins consecutivos
      } else {
        notCompletedHabitsCount++; // Incrementa o contador de hábitos pendentes
        maxSequence = Math.max(maxSequence, currentSequence); // Atualiza a maior sequência
        currentSequence = 0; // Reinicia a sequência
      }
    }
  }

  // Verifica se a última sequência foi a maior
  maxSequence = Math.max(maxSequence, currentSequence);

  // Calcula a porcentagem de conclusão
  const completionPercentage =
    totalHabitDays > 0
      ? Math.floor((completedHabitsCount / totalHabitDays) * 100)
      : 0;

  return {
    habitName: habit.name,
    month: formattedMonth,
    completedHabitsCount,
    notCompletedHabitsCount,
    completionPercentage,
    maxSequence,
  };
};
