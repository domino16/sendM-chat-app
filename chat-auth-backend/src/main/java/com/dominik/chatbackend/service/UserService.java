package com.dominik.chatbackend.service;

import com.dominik.chatbackend.dto.*;
import com.dominik.chatbackend.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface UserService {
     LogInRepsonse registerUser(SignUpRequest request) throws IOException;
     LogInRepsonse login(LogInRequest request);
     List<UserDTO> getAllUsersExceptTheLoggedIn(String loggedInUserEmail);
     UserDTO findUserByEmail(String email);
     List<UserDTO> searchUsersByLetter(String username);
     List<UserDTO> getRandomUsers();
     User uploadFile(MultipartFile file,String userId) throws IOException;
     LogInRepsonse updateUser(EditProfileRequest request) throws IOException;
     byte[] getFile(String id) throws IOException;
}
