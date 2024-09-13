import moment from "moment";

export const converterParaHora = (data = new Date()) => {
  if (data === "") {
    return moment().format("HH:mm");
  }
  if (typeof data === "string" && /^\d{2}:\d{2}$/.test(data)) {
    return data;
  }
  return moment(data).format("HH:mm");
};

export const converterParaData = (data = new Date()) => {
  if (data === "") {
    return moment().toDate();
  }
  if (typeof data === "string" && /^\d{2}:\d{2}$/.test(data)) {
    return moment()
      .set({
        hour: parseInt(data.substring(0, 2)),
        minute: parseInt(data.substring(3, 5)),
        second: 0,
      })
      .toDate();
  }
  return moment(data).toDate();
};
