package com.dominik.chatmessagebackend.repository;

import com.dominik.chatmessagebackend.entity.Chat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChatRepository extends CrudRepository<Chat, UUID> {
    Optional<Chat> findBySenderIdAndRecipientId(String senderId, String recipientId);
    List<Chat> findBySenderId(String id);
}