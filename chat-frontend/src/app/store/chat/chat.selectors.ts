import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromChat from "./chat.reducer";


export const CHAT_STATE_NAME = "chat";

export const getChatState = createFeatureSelector<fromChat.ChatState>(CHAT_STATE_NAME);

export const getSelectedChat = createSelector(getChatState, (state) => state.selectedChat);
export const isSelectedChat = createSelector(getChatState, (state) => !!state.selectedChat)

export const selectChatState = createSelector(getChatState, fromChat.selectChatState);
export const selectAllChats = createSelector(selectChatState, fromChat.selectAllChats);

export const selectMessageState = createSelector(getChatState, fromChat.selectMessagesState);
export const selectAllMessages = createSelector(selectMessageState, fromChat.selectAllMessages);

export const isChatsLoaded = createSelector(getChatState, (state)=> state.chats.allChatsLoaded)
export const isMessagesLoaded = createSelector(getChatState, (state)=> state.messages.allMessagesLoaded)
export const isMoreMesssageLoading = createSelector(getChatState, (state)=> state.messages.isLoadingMoreMessages)


export const selectMessagesLimit = createSelector(getChatState, (state)=> state.messages.messagesLimit)
