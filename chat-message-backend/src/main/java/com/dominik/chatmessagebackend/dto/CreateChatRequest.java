package com.dominik.chatmessagebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateChatRequest {
    private String senderId;
    private String senderName;
    private String recipientId;
    private String recipientName;
}