package com.dominik.chatmessagebackend.service;

import com.dominik.chatmessagebackend.entity.Message;
import com.dominik.chatmessagebackend.entity.MessageStatus;
import com.dominik.chatmessagebackend.repository.ChatRepository;
import com.dominik.chatmessagebackend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.dominik.chatmessagebackend.entity.MessageStatus.DELIVERED;
import static com.dominik.chatmessagebackend.entity.MessageStatus.RECEIVED;

@RequiredArgsConstructor
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ChatRepository chatRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public List<Message> getMessages(String senderId, String recipientId, Long limit) {
        var chatRoom = chatRepository.findBySenderIdAndRecipientId(senderId, recipientId).get();
        if (chatRoom.getMessages().size() > 0) {
            var receivedMessages = chatRoom.getMessages()
                    .stream()
                    .filter(m -> m.getMessageStatus().equals(RECEIVED) && Objects.equals(m.getRecipientId(), senderId))
                    .collect(Collectors.toUnmodifiableList());
            if (receivedMessages.size() != 0) {
                updateStatus(recipientId, senderId, DELIVERED);
            }
        }
        return chatRoom.getMessages()
                .stream()
                .sorted(Comparator.comparing(Message::getCreationDate).reversed())
                .limit(limit)
                .sorted(Comparator.comparing(Message::getCreationDate).reversed())
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public Message getMessage(String id) {
        return messageRepository.findById(UUID.fromString(id))
                .map(message -> {
                    message.setMessageStatus(MessageStatus.DELIVERED);
                    return messageRepository.save(message);

                })
                .orElseThrow(RuntimeException::new);
    }

    @Override
    public Message save(Message message) {
        message.setMessageStatus(RECEIVED);
        return messageRepository.save(message);
    }

    @Override
    public Long countReceivedMessages(String senderId, String recipientId) {
        return messageRepository.countBySenderIdAndRecipientIdAndMessageStatus(senderId, recipientId, RECEIVED);
    }


    @Override
    public void deleteMessage(String id) {
        messageRepository.deleteById(UUID.fromString(id));
    }


    private void updateStatus(String senderId, String recipientId, MessageStatus status) {
        messageRepository.updateStatus(status, senderId, recipientId);
    }


}