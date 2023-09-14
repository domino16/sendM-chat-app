package com.dominik.chatbackend.repository;

import com.dominik.chatbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    List<User> findByEmailNot(String username);
    List<User> findByFirstNameContainingIgnoreCase(String letter);
    List<User> findByLastNameContainingIgnoreCase(String letter);

}
