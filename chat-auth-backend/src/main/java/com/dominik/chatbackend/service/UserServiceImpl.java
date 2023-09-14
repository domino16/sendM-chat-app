package com.dominik.chatbackend.service;

import com.dominik.chatbackend.dto.*;
import com.dominik.chatbackend.model.User;
import com.dominik.chatbackend.exception.AuthException;
import com.dominik.chatbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;

    @Override
    public LogInRepsonse registerUser(SignUpRequest signupRequest) throws IOException {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new AuthException("user '" + signupRequest.getEmail() + "' already exists");
        }
            User user = new User(
                signupRequest.getEmail(),
                    passwordEncoder.encode(signupRequest.getPassword()),
                signupRequest.getFirstName(),
                signupRequest.getLastName(),
                    null
        );
            User savedUser = userRepository.save(user);

        return new LogInRepsonse(tokenProvider.generateToken(savedUser));
    }

    @Override
    public User uploadFile(MultipartFile file,String userId) throws IOException {
        User userFromDb = userRepository.findByEmail(userId).orElseThrow();
        userFromDb.setAvatarImg(file.getBytes());
        return userRepository.save(userFromDb);
    }

    @Override
    public LogInRepsonse updateUser(EditProfileRequest request) {
        User existingUser = userRepository.findByEmail(request.getCurrentUserId()).orElseThrow(() -> new AuthException("User not found"));;
        boolean passwordsMatch = passwordEncoder.matches(request.getOldPassword(), existingUser.getPassword());

        if(request.getNewPassword().isEmpty() && !request.getOldPassword().isEmpty() || !request.getNewPassword().isEmpty() && request.getOldPassword().isEmpty() ){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "If you want to change your password, you must complete the fields for the current and new password");
        }
        if(!passwordsMatch && !request.getOldPassword().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current password is invalid");
        }

        if(passwordsMatch && !request.getNewPassword().isEmpty()){
           existingUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        }

        BeanUtils.copyProperties(request, existingUser);
        return new LogInRepsonse(tokenProvider.generateToken(userRepository.save(existingUser)));
    }

    @Override
    public LogInRepsonse login(LogInRequest request) {
        log.info("2123");
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Invalid password");
        }
        var token = new UsernamePasswordAuthenticationToken(user.getEmail(), request.getPassword());
        var authentication = authenticationManager.authenticate(token);
        return new LogInRepsonse(tokenProvider.generateToken(user));
    }

    @Override
    public List<UserDTO> getAllUsersExceptTheLoggedIn(String loggedInUserEmail) {
        List<User> users = userRepository.findByEmailNot(loggedInUserEmail);
        return users
                .stream()
                .map(this::mapToUserRepsonse)
                .toList();
    }

@Override

    public UserDTO findUserByEmail(String email){
    return mapToUserRepsonse(userRepository.findByEmail(email).orElseThrow());
}
@Override
    public List<UserDTO> searchUsersByLetter(String letter){
    List<User> users = new ArrayList<>();
    users.addAll(userRepository.findByFirstNameContainingIgnoreCase(letter));
    users.addAll(userRepository.findByLastNameContainingIgnoreCase(letter));

    return users
            .stream()
            .map(this::mapToUserRepsonse)
            .toList();
}

@Override
public List<UserDTO> getRandomUsers() {
    List<User> allUsers = userRepository.findAll();
    Collections.shuffle(allUsers);
  return allUsers
            .stream()
            .map(this::mapToUserRepsonse)
            .toList().subList(0, 3);
}

@Override
public byte[] getFile(String id) throws IOException {
    Optional<User> fileEntityOptional = userRepository.findByEmail(id);

    if (fileEntityOptional.isPresent()) {
        User user = fileEntityOptional.get();
        if(user.getAvatarImg() == null){
        Resource resource = new ClassPathResource("png-transparent-orange-and-white-logo-computer-icons-icon-design-person-person-miscellaneous-logo-silhouette.png");
        byte[] imageByte = resource.getContentAsByteArray();
        return imageByte;
        }
    }

    User user = fileEntityOptional.get();
    return user.getAvatarImg();
}

    private UserDTO mapToUserRepsonse(User user) {
        UserDTO userRepsonse = UserDTO.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatarImg("https://auth-api.sendm.site/users/files/" + user.getEmail())
                .build();
        return userRepsonse;
    }

}
