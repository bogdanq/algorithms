export * from "./build-grid";
export * from "./drow-start-end-position";
export * from "./render";
export * from "./render-barrier-with-type";
export * from "./render-path";

const sum = (arr, num = 0) => {
  const el = arr.shift();
  return el ? sum(arr, num) : num;
};
