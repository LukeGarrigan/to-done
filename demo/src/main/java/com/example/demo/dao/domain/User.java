package com.example.demo.dao.domain;

import javax.persistence.*;


@Entity(name = "user")
public class User extends AbstractEntity{

    @Column(nullable = false)
    private String username;

    @Column
    private String email;

    @Column
    private String password;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
