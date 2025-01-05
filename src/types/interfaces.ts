export interface Error {
  code: string;
  config: {
    baseURL: string;
    data: any;
  };
  response: {
    data: { code: number; message: string };
    status: number;
  };
  request: any;
  status: number;
  message: string;
}
