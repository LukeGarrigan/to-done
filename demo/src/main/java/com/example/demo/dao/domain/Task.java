package com.example.demo.dao.domain;



import javax.persistence.*;

@Entity(name = "task")
public class Task extends AbstractEntity{

    @Column
    private String message;

    @Column(nullable = false)
    private String status;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
