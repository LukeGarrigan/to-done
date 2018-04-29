package com.example.demo.rest.controller;
import com.example.demo.rest.dto.TaskDto;
import com.example.demo.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;



    @RequestMapping(value ="/update", method = RequestMethod.POST)
    public TaskDto updateTask(@RequestBody TaskDto taskDto){
        return taskService.updateTask(taskDto);
    }

    @RequestMapping(value ="/updateTasksSequenceNumbers", method = RequestMethod.POST)
    public void updateTasks(@RequestBody List<TaskDto> taskDto){
        taskService.updateTasksSequenceNumbers(taskDto);
    }


    @RequestMapping(value ="/deleteTask/{id}", method = RequestMethod.DELETE)
    public void deleteTask(@PathVariable String id){
        taskService.deleteTask(Long.parseLong(id));
    }

    @RequestMapping(value ="/getTasks{userId}", method = RequestMethod.GET)
    public List<TaskDto> getAllTasks(@PathVariable String userId){
        return taskService.getAllTasks(Long.parseLong(userId));
    }



}
