package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.Medical;
import com.D424.capstone.Repositories.MedicalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medical")
@CrossOrigin
public class MedicalController {

    private final MedicalRepository medicalRepository;

    public MedicalController(MedicalRepository medicalRepository) {
        this.medicalRepository = medicalRepository;
    }

    @GetMapping
    public List<Medical> getAllMedicalRecords() {
        return medicalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Medical getMedicalById(@PathVariable int id) {
        return medicalRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Medical createMedicalRecord(@RequestBody Medical medical) {
        return medicalRepository.save(medical);
    }

    @PutMapping("/{id}")
    public Medical updateMedicalRecord(@PathVariable int id, @RequestBody Medical medical) {
        medical.setId(id);
        return medicalRepository.save(medical);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicalRecord(@PathVariable int id) {
        medicalRepository.deleteById(id);
    }
}
