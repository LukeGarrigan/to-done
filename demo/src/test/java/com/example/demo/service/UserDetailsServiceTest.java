package com.example.demo.service;

import com.example.demo.AbstractTest;
import com.example.demo.dao.domain.User;
import com.example.demo.dao.repository.UserDao;
import com.example.demo.rest.dto.UserDto;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class UserDetailsServiceTest extends AbstractTest {

    @TestConfiguration
    static class UserDetailsServiceImplTestContextConfiguration {

        @Bean
        public UserDetailsService employeeService() {
            return new UserDetailsService();
        }
    }


    @Autowired
    private UserDetailsService userService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private ModelMapper modelMapper;


    @MockBean
    private UserDao userDao;

    private List<User> existingUsers;

    @Before
    public void setUpExistingUsers() {
        User user = new User();
        user.setEmail("firstUser@gmail.com");

        User secondUser = new User();
        secondUser.setEmail("secondUser@gmail.com");

        existingUsers = new ArrayList<>();
        existingUsers.add(user);
        existingUsers.add(secondUser);
    }

    @Test
    public void testCreatingUser() {
        UserDto user = new UserDto();
        user.setEmail("test@gmail.com");
        user.setPassword("testPassword");

        User userDomain = new User();
        userDomain.setEmail(user.getEmail());
        userDomain.setPassword(user.getPassword());

        Mockito.when(passwordEncoder.encode(user.getPassword())).thenReturn("testHashing");
        Mockito.when(userDao.save(userDomain)).thenReturn(userDomain);
        Mockito.when(modelMapper.map(Mockito.any(), Mockito.any())).thenReturn(user);
        UserDto createdUser = userService.createUser(user);
        assertEquals("test@gmail.com", createdUser.getEmail());
    }


    @Test
    public void userAlreadyExists() {
        Mockito.when(userDao.findAll()).thenReturn(existingUsers);

        User user = new User();
        user.setEmail("firstUser@gmail.com");

        boolean doesUserAlreadyExist = userService.userAlreadyExists(user);

        assertEquals(true, doesUserAlreadyExist);

    }


    @Test
    public void userDoesNotAlreadyExists() {
        User newUser = new User();
        newUser.setEmail("idontexistyet@gmail.com");
        Mockito.when(userDao.findAll()).thenReturn(existingUsers);

        boolean doesUserAlreadyExist = userService.userAlreadyExists(newUser);
        assertEquals(false, doesUserAlreadyExist);

    }


    @Test
    public void getAllUsers() {
        Mockito.when(userDao.findAll()).thenReturn(existingUsers);
        List<User> allUsers = userService.getAllUsers();
        assertEquals(existingUsers.get(0).getEmail(), allUsers.get(0).getEmail());
    }


}