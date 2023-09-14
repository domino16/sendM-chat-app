package com.dominik.chatmessagebackend.entity;

import lombok.Getter;

public enum MessageStatus {
    DELIVERED("DELIVERED"), RECEIVED("RECEIVED");

    @Getter
    private final String value;

    MessageStatus(String value) {
        this.value = value;
    }
}