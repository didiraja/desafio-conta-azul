export const INITIAL_DATA = {
  status: 'pending',
  data: {},
  date: {
    object: new Date(),
    formatted: new Date().toLocaleString("en-US", {
      hour: "numeric", minute: "numeric", second: "numeric",
      hour12: true }),
  }
};

export const dateFormatConfig = {
  hour: "numeric", minute: "numeric", second: "numeric",
  hour12: true };