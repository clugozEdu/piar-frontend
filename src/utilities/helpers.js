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
export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
