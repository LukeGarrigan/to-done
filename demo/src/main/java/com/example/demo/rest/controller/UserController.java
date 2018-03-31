package com.example.demo.rest.controller;


import com.example.demo.rest.dto.UserDto;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);

    }
}
