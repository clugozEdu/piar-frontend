import dayjs from "dayjs";

// function to get color and name for user
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const pastelValue = Math.floor(value * 0.7); // Ajustar para colores más oscuros y pasteles
    color += `00${pastelValue.toString(16)}`.slice(-2);
  }

  return color;
};

// function to callback stringColor for return avatar user and color
export const stringAvatar = (name, height, width, sizeFont) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      maxWidth: width ? width : 50,
      maxHeight: height ? height : 50,
      fontSize: sizeFont ? sizeFont : 20,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export const isTaskOverdue = (dueDate, statusTask) => {
  if (statusTask === "Done") {
    return false;
  }

  const today = dayjs();
  const due = dayjs(dueDate);
  return today.isAfter(due, "day");
};

export const groupedTask = (tasks) => {
  return tasks
    .map((task) => ({
      ...task,
      overdue: isTaskOverdue(task.end_date, task.status.name),
    }))
    .sort((a, b) => dayjs(a.end_date).diff(dayjs(b.end_date)))
    .reduce((acc, task) => {
      const status = task.status.name;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {});
};
export const getColorsScheme = (contextName, objectScheme) => {
  return objectScheme[contextName] || "default";
};

export const convertHours = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export const formatDate = (dateString) => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = dayjs(dateString);
  const day = date.date();
  const month = months[date.month()];
  // const year = date.year();

  return `${day} de ${month}`;
};

export const timeOptions = [
  { label: "30 minutos", value: 0.5 },
  { label: "1 hora", value: 1 },
  { label: "1 hora 30 minutos", value: 1.5 },
  { label: "2 horas", value: 2 },
  { label: "2 horas 30 minutos", value: 2.5 },
  { label: "3 horas", value: 3 },
  { label: "3 horas 30 minutos", value: 3.5 },
  { label: "4 horas", value: 4 },
  { label: "4 horas 30 minutos", value: 4.5 },
  { label: "5 horas", value: 5 },
  { label: "5 horas 30 minutos", value: 5.5 },
  { label: "6 horas", value: 6 },
  { label: "6 horas 30 minutos", value: 6.5 },
  { label: "7 horas", value: 7 },
  { label: "7 horas 30 minutos", value: 7.5 },
  { label: "8 horas", value: 8 },
];
