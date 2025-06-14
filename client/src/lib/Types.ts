export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SigninType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserType = {
  name: string;
  email?: string;
  password: string;
};

export type MessageType = {
  sendMessage: ({ message, receiverId, image }: IMessageData) => void;
  getUsers: (query: string) => void;
  getMessages: ({
    id,
    page,
    limit,
  }: {
    id: string;
    page: number;
    limit: number;
  }) => Promise<GetMessageResponse>;
  getUnreadMessages: () => void;
};

export type UserState = {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  isSigningup: boolean;
  isSigningin: boolean;
  isChecking: boolean;
  error: string | null;
  message: string | null;
  onlineUsers: [];
};

export type AuthTypes = {
  signin: (formData: SigninType) => void;
  signup: (formData: SignupType) => void;
  update: (formData: UpdateUserType) => void;
  checkAuth: () => void;
  logout: () => void;
};

export interface IMessageData {
  message: string;
  receiverId: string;
  image: string;
}

export interface GetMessageResponse {
  data: {
    messages: {
      message: string;
      receiverId: string;
      senderId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    hasMore: boolean;
  };
}
