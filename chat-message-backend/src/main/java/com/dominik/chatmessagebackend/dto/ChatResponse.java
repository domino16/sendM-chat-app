package com.dominik.chatmessagebackend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;


@Builder
@Data
public class ChatResponse {
    private String chatId;
    private String recipientName;
    private String recipientId;
    private String lastMessage;
    private LocalDateTime lastMessageDate;
    private String lastMessageUser;
    private Number notificationNumber;
}