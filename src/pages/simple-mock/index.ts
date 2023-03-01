import { createMockData } from "./utils";

console.log(
  createMockData(
    {
      appCode: { from: "en", len: 50 },
    },
    50,
  ),
);
