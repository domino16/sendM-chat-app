import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as ChatActions from "./chat.actions";
import { Chat } from "src/app/core/interfaces/chat";
import { Message } from "src/app/core/interfaces/message";

export interface ChatsEntityState extends EntityState<Chat> {
  allChatsLoaded: boolean;
}

export interface MessagesEntityState extends EntityState<Message> {
  allMessagesLoaded: boolean;
  messagesLimit: number;
  isLoadingMoreMessages: boolean;
}

export const chatsAdapter: EntityAdapter<Chat> = createEntityAdapter<Chat>({
  selectId: (chat: Chat) => chat.chatId,
});

export const messagesAdapter: EntityAdapter<Message> = createEntityAdapter<Message>({});

export interface ChatState {
  chats: ChatsEntityState;
  selectedChat: Chat | null;
  messages: MessagesEntityState;
}

export const initialState: ChatState = {
  chats: chatsAdapter.getInitialState({ allChatsLoaded: false }),
  selectedChat: null,
  messages: messagesAdapter.getInitialState({
    allMessagesLoaded: false,
    messagesLimit: 20,
    isLoadingMoreMessages: false
  }),
};

export const chatReducer = createReducer(
  initialState,
  on(ChatActions.addChat, (state, action) => ({ ...state, chats: chatsAdapter.addOne(action.chat, state.chats) })),

  on(ChatActions.allChatsLoaded, (state, action) => ({
    ...state,
    chats: chatsAdapter.setAll(action.chats, { ...state.chats, allChatsLoaded: true }),
  })),


  on(ChatActions.allMessagesLoaded, (state, action) => ({
    ...state,
    messages: messagesAdapter.setAll(action.messages, { ...state.messages, allMessagesLoaded: true, isLoadingMoreMessages:false }),
  })),

  on(ChatActions.selectChat, (state, action) => ({
    ...state,
    selectedChat: action.selectedChat,
    messages: { ...state.messages, allMessagesLoaded: false },
  })),

  on(ChatActions.addMessage, (state, action) => ({
    ...state,
    messages: messagesAdapter.addOne(action.message, state.messages),
  })),

  on(ChatActions.incrementMessagesLimit, (state) => ({
    ...state,
    messages: { ...state.messages, messagesLimit: state.messages.messagesLimit + 20, isLoadingMoreMessages:true },
  })),

  on(ChatActions.resetMessagesLimit, (state) => ({
    ...state,
    messages: { ...state.messages, messagesLimit: 20 },
  })),


);

export const selectChatState = (state: ChatState) => state.chats;
export const selectMessagesState = (state: ChatState) => state.messages;

export const { selectAll: selectAllChats } = chatsAdapter.getSelectors();
export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors();
