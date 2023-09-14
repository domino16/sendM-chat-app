package com.dominik.chatmessagebackend.controller;

import com.dominik.chatmessagebackend.dto.ChatResponse;
import com.dominik.chatmessagebackend.dto.CreateChatRequest;
import com.dominik.chatmessagebackend.entity.Chat;
import com.dominik.chatmessagebackend.entity.Message;
import com.dominik.chatmessagebackend.entity.MessageNotification;
import com.dominik.chatmessagebackend.service.ChatService;
import com.dominik.chatmessagebackend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Slf4j
@CrossOrigin(origins = "${client.location.url}")
@RequiredArgsConstructor
@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;
    private final MessageService messageService;

    @MessageMapping("/messages")
    public void processMessage(@Payload Message message) {
        if(message.getSenderId() == null){
//            messagingTemplate.convertAndSendToUser(
//                    message.getRecipientId(),
//                    "/queue/messages",
//                    "messages delivered"
//            );
            return;
        }
        var chats = chatService.getChats(message.getSenderId(), message.getRecipientId());
        message.setChats(new HashSet<>(chats));
        Message savedMessage = messageService.save(message);
        messagingTemplate.convertAndSendToUser(
                message.getRecipientId(),
                "/queue/messages",
                savedMessage
        );
        messagingTemplate.convertAndSendToUser(
                message.getSenderId(),
                "/queue/messages",
                savedMessage

        );
    }




    @GetMapping("/chats/{id}")
    public ResponseEntity<List<ChatResponse>> getAllChats(@PathVariable String id) {
        return ResponseEntity.ok(chatService.getAllChats(id));
    }

    @PostMapping("/chats")
    public ResponseEntity<ChatResponse> createChat(@RequestBody CreateChatRequest request) {
        return ResponseEntity.ok(chatService.createChat(request));
    }
    @GetMapping("/chats/{id}/{id2}")
    public ResponseEntity<List<Chat>> getAllChats(@PathVariable String id, @PathVariable String id2) {
        return ResponseEntity.ok(chatService.getChats(id,id2));
    }

}