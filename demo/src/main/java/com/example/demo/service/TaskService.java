package com.example.demo.service;

import com.example.demo.dao.domain.Task;
import com.example.demo.dao.repository.TaskDao;
import com.example.demo.rest.dto.TaskDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TaskDao taskDao;

    public TaskDto updateTask(TaskDto taskDto){
        Task task = new Task();

        task.setMessage(taskDto.getMessage());
        task.setStatus(taskDto.getStatus());
        task.setId(taskDto.getId());

        taskDao.save(task);

        return modelMapper.map(task, TaskDto.class);
    }


    public void deleteTask(long id){
        taskDao.delete(id);
    }

}
