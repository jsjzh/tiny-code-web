type typesMap =
  | "number"
  | "string"
  | "boolean"
  | "object"
  | "null"
  | "undefined"
  | "array"
  | "function"
  | "symbol"
  | "date"
  | "bigint"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "promise"
  | "asyncfunction"
  | string;

export const getType = (obj: any): typesMap =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

export const typeIsSimple = (x: any) =>
  ["string", "number", "boolean", "null", "undefined", "symbol"].includes(
    getType(x),
  );
export const typeIsNumber = (x: any) => getType(x) === "number";

export const typeIsString = (x: any) => getType(x) === "string";

export const typeIsBoolean = (x: any) => getType(x) === "boolean";

export const typeIsNull = (x: any) => getType(x) === "null";

export const typeIsUndefined = (x: any) => getType(x) === "undefined";

export const typeIsObject = (x: any) => getType(x) === "object";

export const typeIsArray = (x: any) => getType(x) === "array";

export const typeIsFunction = (x: any) => getType(x) === "function";

export const typeIsSymbol = (x: any) => getType(x) === "symbol";

export const typeIsDate = (x: any) => getType(x) === "date";

export const typeIsBigInt = (x: any) => getType(x) === "bigint";

export const typeIsMap = (x: any) => getType(x) === "map";

export const typeIsSet = (x: any) => getType(x) === "set";

export const typeIsWeakMap = (x: any) => getType(x) === "weakmap";

export const typeIsWeakSet = (x: any) => getType(x) === "weakset";

export const typeIsPromise = (x: any) => getType(x) === "promise";

export const typeIsAsyncFunction = (x: any) => getType(x) === "asyncfunction";
