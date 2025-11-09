package com.example.demo.controller;


import com.example.demo.model.Equipment;
import com.example.demo.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = "http://localhost:5173")
public class EquipmentController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Get all equipment
    @GetMapping
    public List<Equipment> getAll() {
        return equipmentRepository.findAll();
    }

    // Add new equipment
    @PostMapping
    public Equipment add(@RequestBody Equipment eq) {
        return equipmentRepository.save(eq);
    }

    // Update equipment
    @PutMapping("/{id}")
    public Equipment update(@PathVariable Long id, @RequestBody Equipment eq) {
        Equipment existing = equipmentRepository.findById(id).orElseThrow();
        existing.setName(eq.getName());
        existing.setCategory(eq.getCategory());
        existing.setQuantity(eq.getQuantity());
        existing.setAvailable(eq.isAvailable());
        return equipmentRepository.save(existing);
    }

    // Delete equipment
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        equipmentRepository.deleteById(id);
    }
}
