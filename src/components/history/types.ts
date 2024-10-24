type RedoHistory<T = any> = {
  name: string;
  id?: string;
  time: string;
  data: T[];
};
