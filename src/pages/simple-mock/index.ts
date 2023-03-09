import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { createMockData } from "./utils";

const mockRequestInterceptors = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  console.log(process.env.NODE_ENV);

  console.log(config);

  const myURL = new URL(config.url || "/");

  // console.log(myURL);
  // console.log(myURL.pathname);

  return {
    ...config,
    method: "get",
    url: myURL.pathname + myURL.search,
    mockConfig: {
      enabled: true,
      timeout: 200,
    },
  };
};

const mockResponseInterceptors = (data: AxiosResponse) => {
  console.log(data);

  if (!data.config.mockConfig?.enabled) return data;
  else {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        data.data = data.config.mockData;
        resolve(data);
      }, data.config.mockConfig?.timeout || 200);
    });
  }
};

axios.interceptors.request.use(mockRequestInterceptors);
axios.interceptors.response.use(mockResponseInterceptors);

(async () => {
  const data = await axios.get<{ name: string }>(
    "http://it-billing-pro-web.dasouche-inc.net/businessNode/34/businessUnitNodes?age=18",
    { params: { name: "string" } },
    // {
    //   mockData: (query, data) => {
    //     console.log(query);
    //     console.log(query);
    //   },
    // },
  );

  console.log(data.data);
})();
