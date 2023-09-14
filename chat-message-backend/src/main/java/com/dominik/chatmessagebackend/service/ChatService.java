package com.dominik.chatmessagebackend.service;

import com.dominik.chatmessagebackend.dto.ChatResponse;
import com.dominik.chatmessagebackend.dto.CreateChatRequest;
import com.dominik.chatmessagebackend.entity.Chat;

import java.util.List;

public interface ChatService {
    List<Chat> getChats(String senderId, String recipientId);
    List<ChatResponse> getAllChats(String id);
    ChatResponse createChat(CreateChatRequest request);
}