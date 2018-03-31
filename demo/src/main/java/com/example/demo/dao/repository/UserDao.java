package com.example.demo.dao.repository;


import com.example.demo.dao.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {



}
