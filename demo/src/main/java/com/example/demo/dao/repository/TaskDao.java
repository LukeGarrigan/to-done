package com.example.demo.dao.repository;

import com.example.demo.dao.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskDao extends JpaRepository<Task, Long> {
}
