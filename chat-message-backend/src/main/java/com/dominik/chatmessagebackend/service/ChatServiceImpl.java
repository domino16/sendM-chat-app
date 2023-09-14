package com.dominik.chatmessagebackend.service;

import com.dominik.chatmessagebackend.dto.ChatResponse;
import com.dominik.chatmessagebackend.dto.CreateChatRequest;
import com.dominik.chatmessagebackend.entity.Chat;
import com.dominik.chatmessagebackend.entity.Message;
import com.dominik.chatmessagebackend.entity.MessageStatus;
import com.dominik.chatmessagebackend.repository.ChatRepository;
import com.dominik.chatmessagebackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository repository;
    private final MessageRepository messageRepository;

    @Override
    public List<Chat> getChats(String senderId, String recipientId) {
        var chatRoom = repository.findBySenderIdAndRecipientId(senderId, recipientId);
        var otherChatRoom = repository.findBySenderIdAndRecipientId(recipientId, senderId);
        List<Chat> chats = List.of(chatRoom.get(), otherChatRoom.get());
        return chats;
    }

    @Override
    public List<ChatResponse> getAllChats(String id) {
        return repository.findBySenderId(id).stream().map(this::mapToDto)
                .sorted(Comparator.comparing((ChatResponse chatResponse) -> chatResponse != null ? chatResponse.getLastMessageDate() : null,  Comparator.nullsLast(Comparator.reverseOrder())))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
//
    }

    @Override
    public ChatResponse createChat(CreateChatRequest request) {
        Chat chat;
        try {
            chat = getChats(request.getSenderId(), request.getRecipientId()).get(0);
        } catch (NoSuchElementException e) {
            chat = createChats(request).get(0);
        }
        return ChatResponse.builder()
                .chatId(chat.getChatId())
                .recipientId(chat.getRecipientId())
                .recipientName(request.getRecipientName())
                .build();
    }

    private List<Chat> createChats(CreateChatRequest request) {
        var newChatId = UUID.randomUUID().toString();
        var senderRecipient = Chat.builder()
                .senderId(request.getSenderId())
                .recipientId(request.getRecipientId())
                .senderName(request.getSenderName())
                .recipientName(request.getRecipientName())
                .chatId(newChatId)
                .build();

        var recipientSender = Chat.builder()
                .senderId(request.getRecipientId())
                .recipientId(request.getSenderId())
                .senderName(request.getRecipientName())
                .recipientName(request.getSenderName())
                .chatId(newChatId)
                .build();

        repository.save(senderRecipient);
        repository.save(recipientSender);
        return List.of(senderRecipient, recipientSender);
    }

    private ChatResponse mapToDto(Chat chat) {
        if (chat.getMessages().size()-1 == -1) {
            return null;
        }

        var lastMessage = chat.getMessages().stream().max(Comparator.comparing(Message::getCreationDate)).get();

        return ChatResponse.builder()
                .chatId(chat.getChatId())
                .recipientId(chat.getRecipientId())
                .recipientName(chat.getRecipientName())
                .lastMessage(lastMessage.getContent())
                .lastMessageDate(lastMessage.getCreationDate())
                .lastMessageUser(lastMessage.getSenderId().equals(chat.getSenderId()) ? chat.getSenderName() : chat.getRecipientName())
                .notificationNumber(this.messageRepository.countBySenderIdAndRecipientIdAndMessageStatus(chat.getRecipientId(), chat.getSenderId(), MessageStatus.RECEIVED))
                .build();
    }
}