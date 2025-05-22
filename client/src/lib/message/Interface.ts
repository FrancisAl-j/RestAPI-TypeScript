export interface IMessage {
  users: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  currUser: {
    _id: string;
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  messages: {
    message: string;
    receiverId: string;
    senderId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  isLoading: boolean;
}
