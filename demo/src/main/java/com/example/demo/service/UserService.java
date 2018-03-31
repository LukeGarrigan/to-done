package com.example.demo.service;


import com.example.demo.dao.domain.User;
import com.example.demo.dao.repository.UserDao;
import com.example.demo.rest.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private UserDao userDao;


    /**
     *
     *  Updates the current user, if the user doesn't exist then it creates a new one
     * @param userDto
     * @return
     */
    public UserDto updateUser(UserDto userDto) {

        User user = userDao.getOne(userDto.getId());

        if (user != null) {
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setUsername(userDto.getUsername());
        } else {
            // User doesn't exist, so create a new one
            user = new User();
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());
            user.setUsername(userDto.getUsername());
            userDao.save(user);
        }

        return modelMapper.map(user, UserDto.class);
    }

}
