package com.example.demo.service;

import com.example.demo.dao.domain.Task;
import com.example.demo.dao.repository.TaskDao;
import com.example.demo.rest.dto.TaskDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

        List<Task> allTasks = taskDao.findAll();

        boolean taskAlreadyExists = false;
        for(Task t: allTasks){
            if(t.getMessage().equals(task.getMessage())){
              taskAlreadyExists = true;
            }
        }

        if(!taskAlreadyExists){
            taskDao.save(task);
        }


        return modelMapper.map(task, TaskDto.class);
    }


    public void deleteTask(long id){
        taskDao.delete(id);
    }

    public List<TaskDto> getAllTasks(){
        List<Task> all = taskDao.findAll();

        List<TaskDto> allDtos = new ArrayList<>();

        for(Task t: all){
            allDtos.add(modelMapper.map(t, TaskDto.class));
        }
        return allDtos;
    }

}
