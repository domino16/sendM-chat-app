export interface Chat{
  chatId: string;
  recipientName: string;
  recipientId: string;
  lastMessage: string;
  lastMessageDate: Date;
  lastMessageUser: string;
  notificationNumber: number;
}
