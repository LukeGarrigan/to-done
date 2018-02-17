package com.example.demo.dao.repository;

import com.example.demo.dao.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TaskDao extends JpaRepository<Task, Long> {


    /**
     * To retrieve for instance tasks which are to do
     * @param status
     * @return
     */
    @Query(value = "SELECT u FROM task u where status = ?1")
    List<Task> getTasksByStatus(String status);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value ="UPDATE task t SET t.sequenceNumber =?1 WHERE t.id= ?2 ")
    void updateTaskSequence(long sequenceNumber, long id);

}
