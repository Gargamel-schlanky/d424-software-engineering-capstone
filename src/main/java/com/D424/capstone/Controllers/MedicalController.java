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

    @PostMapping
    public Medical createMedicalRecord(@RequestBody Medical medical) {
        return medicalRepository.save(medical);
    }
}
