const convertToCelsius = temp => (temp - 32) * (5 / 9);
const convertToFahrenheit = temp => (temp * (9 / 5)) + 32;

export { convertToCelsius, convertToFahrenheit };
