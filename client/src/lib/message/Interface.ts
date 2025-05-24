export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface IMessage {
  users: User[];
  currUser: User | null;
  messages: {
    message: string;
    receiverId: string;
    senderId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  isMessagesLoaidng: boolean;
  isLoading: boolean;
  error: string | null;
}
