export type SigninType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
};

export type MessageType = {
  sendMessage: ({ message, receiverId, image }: IMessageData) => void;
  getUsers: () => void;
  getMessages: ({ id }: { id: string }) => void;
};

export type AuthTypes = {
  signin: (formData: SigninType) => void;
  signup: (formData: SignupType) => void;
  checkAuth: () => void;
  logout: () => void;
};

export interface IMessageData {
  message: string;
  receiverId: string;
  image: string;
}
