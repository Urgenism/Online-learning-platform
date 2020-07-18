import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

// Default API will be your root
const API_ROOT = process.env.URL || "http://localhost:8000/";
const TIMEOUT = 20000;
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

class ApiService {
  client: any;

  constructor({
    baseURL = API_ROOT,
    timeout = TIMEOUT,
    headers = HEADERS,
    auth,
  }: AxiosRequestConfig) {
    const client = axios.create({
      baseURL,
      timeout,
      headers,
      auth,
    });

    client.interceptors.response.use(this.handleSuccess, this.handleError);
    this.client = client;
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError(error: AxiosError) {
    return Promise.reject(error);
  }

  get(path: string) {
    return this.client
      .get(path)
      .then((response: AxiosResponse) => response.data);
  }

  post(path: string, payload: any) {
    return this.client
      .post(path, payload)
      .then((response: AxiosResponse) => response.data);
  }

  put(path: string, payload: any) {
    return this.client
      .put(path, payload)
      .then((response: AxiosResponse) => response.data);
  }

  patch(path: string, payload: any) {
    return this.client
      .patch(path, payload)
      .then((response: AxiosResponse) => response.data);
  }

  delete(path: any) {
    return this.client
      .delete(path)
      .then((response: AxiosResponse) => response.data);
  }
}

export default ApiService;
