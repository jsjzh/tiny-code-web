import axios, { AxiosResponse } from "axios";
import { createMockData } from "./utils";

axios.interceptors.request.use((config) => {
  console.log(config);
  return {
    ...config,
    mockConfig: {
      enabled: true,
      timeout: 500,
    },
  };
});

// <{ mockConfig: any }>

axios.interceptors.response.use(
  (
    data: AxiosResponse<
      any,
      {
        mockConfig: {
          enabled: boolean;
          timeout: number;
        };
        mockData: any;
      }
    >,
  ) => {
    if (!(data.config as any).mockConfig.enabled) return data;
    else {
      console.log(data.config.mockData);

      console.log(data.config.loading);

      return new Promise((resolve) => {
        setTimeout(() => {
          data.data = "you have been promised!";
          resolve(data);
        }, 200);
      });
    }
  },
);

(async () => {
  const data = await axios.get("123", {
    mockData: { name: "king" },
    // transformRequest(...args) {
    //   console.log(args);
    // },
    // transformResponse(...args) {
    //   console.log(args);
    // },
  });

  // console.log(data);
})();
