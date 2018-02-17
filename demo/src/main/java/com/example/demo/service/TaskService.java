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

    public void updateTasksSequenceNumbers(List<TaskDto> taskDtos){
        List<Task> all = taskDao.getTasksByStatus(taskDtos.get(0).getStatus());


        for(TaskDto taskDto: taskDtos){
            for(Task task: all){
                if(taskDto.getId()==task.getId()){
                    taskDao.updateTaskSequence(taskDto.getSequenceNumber(),taskDto.getId());
                }
            }

        }
    }

    public TaskDto updateTask(TaskDto taskDto){
        Task task = new Task();

        task.setMessage(taskDto.getMessage());
        task.setStatus(taskDto.getStatus());
        task.setId(taskDto.getId());
        task.setSequenceNumber(taskDto.getSequenceNumber());
        List<Task> allTasks = taskDao.findAll();

        boolean taskAlreadyExists = false;
        for(Task t: allTasks){

            // we want to make sure that we don't have a duplicate and also wantt to ensure that we're not preventing an
            // update of an already existing task
            if(t.getMessage().equals(task.getMessage()) && t.getId() != task.getId()){
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

}
