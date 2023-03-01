const createFromCharCode = (start: number, end: number) => {
  const result = [];
  for (let code = start; code <= end; code++)
    result.push(String.fromCharCode(code));

  return result;
};

export const randomFromArr = <T>(arrs: T[], len: number): T[] => {
  const result = [];
  for (let index = 1; index <= len; index++) {
    result.push(arrs[Math.floor(Math.random() * (arrs.length - 1))]);
  }
  return result;
};

const alignArrs = <T>(arrs: T[][]): T[][] => {
  const maxLen = Math.max.apply(
    null,
    arrs.map((arr) => arr.length),
  );

  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i];
    if (arr.length < maxLen)
      arr.push(...randomFromArr(arr, maxLen - arr.length));
  }

  return arrs;
};

// A-Z
export const upperChars = createFromCharCode(65, 90);
// a-z
export const lowerChars = createFromCharCode(97, 122);
// 0-9
export const numChars = createFromCharCode(48, 57);
// " "
export const spaceChars = createFromCharCode(32, 32);
// 中文
// 19968 ~ 40869
// 太长了，就给 26 个
const x = 19968;
export const chineseChars = createFromCharCode(x, x + 25);

export const [
  alignUpperChars,
  alignLowerChars,
  alignNumChars,
  alignSpaceChars,
  alignChineseChars,
] = alignArrs([upperChars, lowerChars, numChars, spaceChars, chineseChars]);

export const createMockData = <T = any>(
  obj: { [k: string]: { from: "en" | "zh" | "num" | any[]; len: number } },
  len = 50,
): T[] => {
  const create = () =>
    Object.keys(obj).reduce((pre, curr) => {
      return {
        ...pre,
        [curr]:
          obj[curr].from === "en"
            ? randomFromArr(
                [...alignUpperChars, ...alignLowerChars, ...alignSpaceChars],
                obj[curr].len,
              ).join("")
            : obj[curr].from === "zh"
            ? randomFromArr(
                [...alignChineseChars, ...alignSpaceChars],
                obj[curr].len,
              ).join("")
            : obj[curr].from === "num"
            ? Number(randomFromArr([...alignNumChars], obj[curr].len).join(""))
            : Array.isArray(obj[curr].from)
            ? randomFromArr(obj[curr].from as any[], obj[curr].len).join("")
            : "",
      };
    }, {});

  return new Array(len).fill(null).map(create) as any;
};
