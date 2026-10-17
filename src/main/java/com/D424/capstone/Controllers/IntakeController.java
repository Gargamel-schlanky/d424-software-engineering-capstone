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

    @GetMapping("/animal/{id}")
    public Intake getIntakeById(@PathVariable Long id) {
        return intakeRepository.findById(id).orElse(null);
    }

    @PostMapping("/animal")
    public Intake createIntake(@RequestBody Intake intake) {
        return intakeRepository.save(intake);
    }

    @PutMapping("/animal/{id}")
    public Intake updateIntake(@PathVariable Long id, @RequestBody Intake intake) {
        intake.setId(id);
        return intakeRepository.save(intake);
    }

    @DeleteMapping("/animal/{id}")
    public void deleteIntake(@PathVariable Long id) {
        intakeRepository.deleteById(id);
    }
}
