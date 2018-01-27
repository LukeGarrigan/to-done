package com.example.demo.rest.dto;

import java.io.Serializable;

public class TaskDto implements Serializable{

    private String status;
    private String message;
    private long id;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
