package com.example.demo.service;

import com.example.demo.dao.domain.Task;
import com.example.demo.dao.repository.TaskDao;
import com.example.demo.rest.dto.TaskDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {


    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TaskDao taskDao;

    @Autowired
    private UserService userService;

    public void updateTasksSequenceNumbers(List<TaskDto> taskDtos){
        List<Task> all = taskDao.findAll();
        for(TaskDto taskDto: taskDtos){
            for(Task task: all){
                if(taskDto.getId()==task.getId()){
                    taskDao.updateTaskSequence(taskDto.getSequenceNumber(), taskDto.getStatus(),taskDto.getId());
                }
            }
        }
    }

    public TaskDto updateTask(TaskDto taskDto){
        Task task = new Task();
        task.setUser(userService.getUser(taskDto.getUserId()));
        task.setMessage(taskDto.getMessage());
        task.setStatus(taskDto.getStatus());
        task.setId(taskDto.getId());
        task.setSequenceNumber(taskDto.getSequenceNumber());
        boolean taskAlreadyExists = doesTaskAlreadyExist(task);

        if(!taskAlreadyExists){
            taskDao.save(task);
        }


        return modelMapper.map(task, TaskDto.class);
    }

    private boolean doesTaskAlreadyExist(Task task) {
        List<Task> allTasks = taskDao.findAll();
        for(Task t: allTasks){
            if(t.getMessage().equals(task.getMessage()) && t.getId() != task.getId()){
               return true;
            }
        }
        return false;
    }


    public void deleteTask(long id){
        taskDao.delete(id);
    }

    public List<TaskDto> getAllTasks(long userId){
        List<Task> all = getAllUsersTasks(userId);

        List<TaskDto> allDtos = new ArrayList<>();

        for(Task t: all){
            allDtos.add(modelMapper.map(t, TaskDto.class));
        }

        allDtos.sort(new Comparator<TaskDto>() {
            @Override
            public int compare(TaskDto o1, TaskDto o2) {
                if (o1.getSequenceNumber() == o2.getSequenceNumber()) {
                    return 0;
                }
                return o1.getSequenceNumber() < o2.getSequenceNumber() ? -1 : 1;
            }
        });
        return allDtos;
    }

    private List<Task> getAllUsersTasks(long userId) {
        List<Task> allTasks = taskDao.findAll();

        List<Task> usersTasks = new ArrayList<>();
        for (Task task : allTasks) {
            if(task.getUser().getId() == userId) {
                usersTasks.add(task);
            }
        }
        return usersTasks;
    }

}
