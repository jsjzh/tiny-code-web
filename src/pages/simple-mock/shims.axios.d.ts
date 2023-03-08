import { AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosResponse {
    loading?: boolean;
  }
}
