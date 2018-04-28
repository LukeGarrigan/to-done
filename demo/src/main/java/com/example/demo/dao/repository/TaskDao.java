package com.example.demo.dao.repository;

import com.example.demo.dao.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface TaskDao extends JpaRepository<Task, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value ="UPDATE task t SET t.sequenceNumber =?1 , t.status =?2 WHERE t.id= ?3 ")
    void updateTaskSequence(long sequenceNumber, String status ,long id);

}
