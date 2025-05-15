export interface IUser {
  name: string;
  email: string;
  password: string;
}

export type Payload = {
  _id: string;
  email: string;
  name: string;
};
