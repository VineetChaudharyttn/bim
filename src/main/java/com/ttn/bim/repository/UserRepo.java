package com.ttn.bim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttn.bim.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
