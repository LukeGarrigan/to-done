package com.example.demo.service;


import com.example.demo.dao.domain.User;
import com.example.demo.dao.repository.UserDao;
import com.example.demo.rest.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsService implements UserService {


    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;


    private boolean userAlreadyExists(User userToBeCreated) {
        for (User existingUser : getAllUsers()) {
            if (existingUser.getEmail().equals(userToBeCreated.getEmail())) {
                return true;
            }
            if (existingUser.getUsername().equals(userToBeCreated.getUsername())) {
                return true;
            }
        }
        return false;
    }


    private List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUsername(userDto.getUsername());

        if (!userAlreadyExists(user)) {
            userDao.save(user);
            return modelMapper.map(user, UserDto.class);
        }

        return null;
    }

    @Override
    public User getUser(long id) {
        return userDao.getOne(id);
    }

}
