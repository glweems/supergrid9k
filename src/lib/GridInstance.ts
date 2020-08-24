import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

const backendUrl =
  (process.env as any) === "production"
    ? "https://supergrid9k-server.herokuapp.com"
    : "http://localhost:5000";

export const GridInstance = Axios.create({
  baseURL: `${backendUrl}/grid`,
  transformRequest: Axios.defaults.transformRequest,
  transformResponse: [...Axios.defaults.transformResponse].concat(
    ({ data }) => data
  ),
});

export const useGridInstance = makeUseAxios({ axios: GridInstance });
