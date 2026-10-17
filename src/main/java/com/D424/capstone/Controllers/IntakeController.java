package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.Animal;
import com.D424.capstone.Entities.Intake;
import com.D424.capstone.Entities.Staff;
import com.D424.capstone.Repositories.AnimalRepository;
import com.D424.capstone.Repositories.IntakeRepository;
import com.D424.capstone.Repositories.StaffRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intake")
@CrossOrigin
public class IntakeController {

    private final IntakeRepository intakeRepository;
    private final AnimalRepository animalRepository;
    private final StaffRepository staffRepository;

    public IntakeController(IntakeRepository intakeRepository, AnimalRepository animalRepository, StaffRepository staffRepository) {
        this.intakeRepository = intakeRepository;
        this.animalRepository = animalRepository;
        this.staffRepository = staffRepository;
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
        if (intake.getAnimal() != null && intake.getAnimal().getId() != null) {
            Animal resolvedAnimal = animalRepository.findById(intake.getAnimal().getId()).orElse(intake.getAnimal());
            intake.setAnimal(resolvedAnimal);
        } else {
            intake.setAnimal(null);
        }

        if (intake.getIntake_staff_member() != null && intake.getIntake_staff_member().getId() != 0) {
            Staff resolvedStaff = staffRepository.findById(intake.getIntake_staff_member().getId()).orElse(intake.getIntake_staff_member());
            intake.setIntake_staff_member(resolvedStaff);
        } else {
            intake.setIntake_staff_member(null);
        }

        return intakeRepository.save(intake);
    }

    @PutMapping("/animal/{id}")
    public Intake updateIntake(@PathVariable Long id, @RequestBody Intake intake) {
        intake.setId(id);

        if (intake.getAnimal() != null && intake.getAnimal().getId() != null) {
            Animal resolvedAnimal = animalRepository.findById(intake.getAnimal().getId()).orElse(intake.getAnimal());
            intake.setAnimal(resolvedAnimal);
        } else {
            intake.setAnimal(null);
        }

        if (intake.getIntake_staff_member() != null && intake.getIntake_staff_member().getId() != 0) {
            Staff resolvedStaff = staffRepository.findById(intake.getIntake_staff_member().getId()).orElse(intake.getIntake_staff_member());
            intake.setIntake_staff_member(resolvedStaff);
        } else {
            intake.setIntake_staff_member(null);
        }

        return intakeRepository.save(intake);
    }

    @DeleteMapping("/animal/{id}")
    public void deleteIntake(@PathVariable Long id) {
        intakeRepository.deleteById(id);
    }
}
