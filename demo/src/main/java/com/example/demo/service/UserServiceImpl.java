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
public class UserServiceImpl implements UserService, DtoDomainConversion<UserDto, User> {


    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public UserDto createUser(UserDto userDto) {

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        if (!userAlreadyExists(user)) {
            userDao.save(user);
            return toDto(user);
        }

        return null;
    }

    @Override
    public User getUser(long id) {
        return userDao.getOne(id);
    }

    @Override
    public UserDto loginUser(UserDto userDto) {
        for (User existingUser : getAllUsers()) {
            if (existingUser.getEmail().equals(userDto.getEmail())) {
                if (passwordEncoder.matches(userDto.getPassword(), existingUser.getPassword())) {
                    return toDto(existingUser);
                }
            }
        }
        return null;
    }


    public boolean userAlreadyExists(User userToBeCreated) {
        for (User existingUser : getAllUsers()) {
            if (existingUser.getEmail().equals(userToBeCreated.getEmail())) {
                return true;
            }
        }
        return false;
    }


    @Override
    public UserDto toDto(User domain) {
        return modelMapper.map(domain, UserDto.class);
    }
}
