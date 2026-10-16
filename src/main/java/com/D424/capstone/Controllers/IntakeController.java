package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.Intake;
import com.D424.capstone.Repositories.IntakeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intake")
@CrossOrigin
public class IntakeController {

    private final IntakeRepository intakeRepository;

    public IntakeController(IntakeRepository intakeRepository) {
        this.intakeRepository = intakeRepository;
    }

    @GetMapping("/animal")
    public List<Intake> getAllIntakes() {
        return intakeRepository.findAll();
    }

    @PostMapping("/animal")
    public Intake createIntake(@RequestBody Intake intake) {
        return intakeRepository.save(intake);
    }
}
