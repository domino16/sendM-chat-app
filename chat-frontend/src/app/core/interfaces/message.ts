export interface Message{
  id?: string;
  senderId: string;
  recipientId: string;
  content: string;
  creationDate?: Date;
  messageStatus?: 'RECEIVED' | 'DELIVERED'
}
