package com.klu.todolist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // Create a new todo
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Get a todo by ID
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }

    // Update an existing todo
    public Todo updateTodo(Long id, Todo updatedTodo) {
        return todoRepository.findById(id).map(todo -> {
            todo.setTask(updatedTodo.getTask());
            todo.setStatus(updatedTodo.isStatus());
            return todoRepository.save(todo);
        }).orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    // Delete a todo by ID
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }
}