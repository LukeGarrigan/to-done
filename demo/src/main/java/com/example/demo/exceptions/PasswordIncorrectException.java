package com.example.demo.exceptions;

public class PasswordIncorrectException extends RuntimeException {

    public PasswordIncorrectException(String email) {
        super("Password for " + email + " is incorrect");
    }
}
