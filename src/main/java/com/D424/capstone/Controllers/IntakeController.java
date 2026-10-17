package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.Animal;
import com.D424.capstone.Entities.Intake;
import com.D424.capstone.Entities.Staff;
import com.D424.capstone.Repositories.AnimalRepository;
import com.D424.capstone.Repositories.IntakeRepository;
import com.D424.capstone.Repositories.StaffRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
        if (intake.getAnimal() != null) {
            Animal animal = intake.getAnimal();
            if (animal.getId() != null && animal.getId() > 0) {
                Optional<Animal> existingAnimal = animalRepository.findById(animal.getId());
                if (existingAnimal.isPresent()) {
                    intake.setAnimal(existingAnimal.get());
                } else if (animal.getName() != null && !animal.getName().trim().isEmpty()) {
                    animal.setId(null);
                    if (animal.getAdoptable() == null) animal.setAdoptable(true);
                    if (animal.getCurrent_resident() == null) animal.setCurrent_resident(true);
                    intake.setAnimal(animalRepository.save(animal));
                } else {
                    intake.setAnimal(null);
                }
            } else if (animal.getName() != null && !animal.getName().trim().isEmpty()) {
                animal.setId(null);
                if (animal.getAdoptable() == null) animal.setAdoptable(true);
                if (animal.getCurrent_resident() == null) animal.setCurrent_resident(true);
                intake.setAnimal(animalRepository.save(animal));
            } else {
                intake.setAnimal(null);
            }
        } else {
            intake.setAnimal(null);
        }

        if (intake.getIntake_staff_member() != null && intake.getIntake_staff_member().getId() != 0) {
            Optional<Staff> existingStaff = staffRepository.findById(intake.getIntake_staff_member().getId());
            if (existingStaff.isPresent()) {
                intake.setIntake_staff_member(existingStaff.get());
            } else {
                intake.setIntake_staff_member(null);
            }
        } else {
            intake.setIntake_staff_member(null);
        }

        return intakeRepository.save(intake);
    }

    @PutMapping("/animal/{id}")
    public Intake updateIntake(@PathVariable Long id, @RequestBody Intake intake) {
        intake.setId(id);

        if (intake.getAnimal() != null) {
            Animal animal = intake.getAnimal();
            if (animal.getId() != null && animal.getId() > 0) {
                Optional<Animal> existingAnimal = animalRepository.findById(animal.getId());
                if (existingAnimal.isPresent()) {
                    intake.setAnimal(existingAnimal.get());
                } else if (animal.getName() != null && !animal.getName().trim().isEmpty()) {
                    animal.setId(null);
                    if (animal.getAdoptable() == null) animal.setAdoptable(true);
                    if (animal.getCurrent_resident() == null) animal.setCurrent_resident(true);
                    intake.setAnimal(animalRepository.save(animal));
                } else {
                    intake.setAnimal(null);
                }
            } else if (animal.getName() != null && !animal.getName().trim().isEmpty()) {
                animal.setId(null);
                if (animal.getAdoptable() == null) animal.setAdoptable(true);
                if (animal.getCurrent_resident() == null) animal.setCurrent_resident(true);
                intake.setAnimal(animalRepository.save(animal));
            } else {
                intake.setAnimal(null);
            }
        } else {
            intake.setAnimal(null);
        }

        if (intake.getIntake_staff_member() != null && intake.getIntake_staff_member().getId() != 0) {
            Optional<Staff> existingStaff = staffRepository.findById(intake.getIntake_staff_member().getId());
            if (existingStaff.isPresent()) {
                intake.setIntake_staff_member(existingStaff.get());
            } else {
                intake.setIntake_staff_member(null);
            }
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
