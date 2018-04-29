package com.example.demo.dao.domain;



import javax.persistence.*;

@Entity(name = "task")
public class Task extends AbstractEntity{

    @Column
    private String message;

    @Column(nullable = false)
    private String status;

    @Column
    private long sequenceNumber;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public long getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(long sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

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
