package com.example.demo.service;

import com.example.demo.dao.domain.User;
import com.example.demo.rest.dto.UserDto;

public interface UserService {

    UserDto createUser(UserDto user);

    User getUser(long id);

}


