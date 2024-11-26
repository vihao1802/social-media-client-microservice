// export interface here
export interface Friends {
  id: number;
  name: string;
  text: string;
  avatar: string;
  title: string;
  subtitle: string;
  date: Date;
}

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
