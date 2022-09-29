export const getElipseText = (wallet) => {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
};

export const numberConverter = (value, decimals = 3) => {
  return Number(value).toFixed(decimals);
  // Nine Zeroes for Billions
  return Math.abs(Number(value)) >= 1.0e12
    ? (Math.abs(Number(value)) / 1.0e12).toFixed(decimals) + " T"
    : Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(decimals) + " B"
    : Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(decimals) + " M"
    : Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e3).toFixed(decimals) + " K"
    : Math.abs(Number(value)).toFixed(decimals);
};
