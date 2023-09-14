package com.dominik.chatmessagebackend.service;

import com.dominik.chatmessagebackend.entity.Message;

import java.util.List;

public interface MessageService {
    List<Message> getMessages(String senderId, String recipientId, Long limit);

    Message getMessage(String id);

    Message save(Message message);

    Long countReceivedMessages(String senderId, String recipientId);

    void deleteMessage(String id);

}