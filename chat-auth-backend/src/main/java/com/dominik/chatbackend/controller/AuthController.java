package com.dominik.chatbackend.controller;

import com.dominik.chatbackend.dto.LogInRequest;
import com.dominik.chatbackend.dto.LogInRepsonse;
import com.dominik.chatbackend.dto.SignUpRequest;
import com.dominik.chatbackend.dto.UserDTO;
import com.dominik.chatbackend.exception.AuthException;
import com.dominik.chatbackend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dominik.chatbackend.service.UserService;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "${client.location.url}")
public class AuthController {

    private final UserService userService;

        @PostMapping("/signup")
    public ResponseEntity<?> signUp(
            @RequestBody SignUpRequest request
    ) throws IOException {
            try{
                return ResponseEntity.ok(userService.registerUser(request));}
            catch (AuthException e){
                return ResponseEntity.badRequest().body(e.getMessage());
            }
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(
            @RequestBody LogInRequest request
    ) {
        try {
            return ResponseEntity.ok(userService.login(request));
        }
        catch (AuthException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}