import { InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    mockConfig?: { enabled?: boolean; timeout?: number };
    mockData?: { [k: string]: any };
  }

  export interface AxiosRequestConfig {
    mockConfig?: { enabled?: boolean; timeout?: number };
    // mockData?: { [k: string]: any };
    mockData?: (query: string, data: string) => void;
  }
}
