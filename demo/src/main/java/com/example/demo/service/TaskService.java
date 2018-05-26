package com.example.demo.service;

import com.example.demo.dao.domain.Task;
import com.example.demo.rest.dto.TaskDto;

import java.util.List;

public interface TaskService {


    void updateTasksSequenceNumbers(List<TaskDto> taskDtos);

    TaskDto updateTask(TaskDto taskDto);

    void deleteTask(long id);

    List<TaskDto> getAllTasks(long userId);

    List<Task> getAllUsersTasks(long userId);
}
