package com.dominik.chatbackend.controller;

import com.dominik.chatbackend.dto.EditProfileRequest;
import com.dominik.chatbackend.dto.LogInRepsonse;
import com.dominik.chatbackend.dto.UserDTO;
import com.dominik.chatbackend.repository.UserRepository;
import com.dominik.chatbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "${client.location.url}")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;


    @GetMapping("/users/{email}")
    public ResponseEntity<List<UserDTO>> getAllUsers(@PathVariable String email){
        return ResponseEntity.ok(userService.getAllUsersExceptTheLoggedIn(email));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email){
        return ResponseEntity.ok(userService.findUserByEmail(email));
    }

    @GetMapping("/search/{letter}")
    public ResponseEntity<List<UserDTO>> searchUsers(@PathVariable String letter){
        if(letter.isEmpty()) return ResponseEntity.ok(userService.getRandomUsers());
        return ResponseEntity.ok(userService.searchUsersByLetter(letter));
    }

    @GetMapping("/search/random")
    public ResponseEntity<List<UserDTO>> getRandomUsers(){
    return ResponseEntity.ok(userService.getRandomUsers());
    }



    @PostMapping("/user/update")
    public ResponseEntity uploadFile(@RequestParam("file")MultipartFile file, @RequestParam("userId")String userId) throws IOException {
        userService.uploadFile(file,userId);

        return ResponseEntity.ok().build();
    }

@Transactional
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) throws IOException {
    CacheControl cacheControl = CacheControl.maxAge(1000, TimeUnit.SECONDS)
            .noTransform()
            .mustRevalidate();


        return ResponseEntity.ok().cacheControl(cacheControl)
                .contentType(MediaType.IMAGE_PNG)
                .body(userService.getFile(id));
    }

    @PostMapping("/user/edit")
    public ResponseEntity<?> editProfile(@RequestBody EditProfileRequest request) throws IOException {
        try{return ResponseEntity.ok().body(userService.updateUser(request));}
        catch (ResponseStatusException e){
            return ResponseEntity.ok().body(e.getReason());
        }

    }

//
//@Transactional
//    @GetMapping("files")
//    public List<ResponseFile> list() {
//        return userService.getAllUsersExceptTheLoggedIn("domino16-9@o2.pl")
//                .stream()
//                .map(this::mapToFileResponse)
//                .collect(Collectors.toList());
//    }
//
//    private ResponseFile mapToFileResponse(User user) {
//        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/users/files/")
//                .path(user.getEmail())
//                .toUriString();
//        ResponseFile fileResponse = new ResponseFile();
//        fileResponse.setUrl(downloadURL);
//
//        return fileResponse;
//    }


}

