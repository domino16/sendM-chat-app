package com.dominik.chatmessagebackend.repository;

import com.dominik.chatmessagebackend.entity.Message;
import com.dominik.chatmessagebackend.entity.MessageStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends CrudRepository<Message, UUID> {

    @Transactional
    @Modifying
    @Query("update Message m set m.messageStatus=:status where m.senderId=:sender_id and m.recipientId=:recipient_id")
    void updateStatus(@Param("status") MessageStatus status, @Param("sender_id") String senderId, @Param("recipient_id") String recipientId);
    Long countBySenderIdAndRecipientIdAndMessageStatus(String senderId, String recipientId, MessageStatus messageStatus);

    @Query("select m from Message m where m.content like %?1%")
    List<Message> findLikeValue(String value);
}