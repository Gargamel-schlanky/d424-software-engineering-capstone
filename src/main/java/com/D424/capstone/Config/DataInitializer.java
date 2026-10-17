package com.D424.capstone.Config;

import com.D424.capstone.Entities.*;
import com.D424.capstone.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(
            AnimalRepository animalRepository,
            StaffRepository staffRepository,
            MedicalRepository medicalRepository,
            IntakeRepository intakeRepository,
            UserRepository userRepository
    ) {
        return args -> {
            // Seed Admin User if none exists
            if (!userRepository.existsByUsername("administrator")) {
                User admin = new User("administrator", "admin123", "ADMIN");
                userRepository.save(admin);
            }

            // Seed Sample Animals if table is empty
            if (animalRepository.count() == 0) {
                Animal dog = new Animal();
                dog.setName("Buddy");
                dog.setAge("2 years");
                dog.setDescription("Golden Retriever mix, friendly and energetic");
                dog.setMedical_id(101);
                dog.setAdoptable(true);
                dog.setCurrent_resident(true);
                animalRepository.save(dog);

                Animal cat = new Animal();
                cat.setName("Whiskers");
                cat.setAge("1 year");
                cat.setDescription("Domestic Shorthair, gentle and quiet");
                cat.setMedical_id(102);
                cat.setAdoptable(true);
                cat.setCurrent_resident(true);
                animalRepository.save(cat);

                Animal rabbit = new Animal();
                rabbit.setName("Hoppy");
                rabbit.setAge("6 months");
                rabbit.setDescription("Holland Lop rabbit, brown coat");
                rabbit.setMedical_id(103);
                rabbit.setAdoptable(true);
                rabbit.setCurrent_resident(true);
                animalRepository.save(rabbit);
            }

            // Seed Sample Staff if empty
            if (staffRepository.count() == 0) {
                Staff staff1 = new Staff("Jane Doe", new Date());
                staff1.setPhone("555-0192");
                staff1.setPosition("Intake Coordinator");
                staff1.setOn_call_duty(true);
                staffRepository.save(staff1);

                Staff staff2 = new Staff("John Smith", new Date());
                staff2.setPhone("555-0143");
                staff2.setPosition("Veterinarian Tech");
                staff2.setOn_call_duty(false);
                staffRepository.save(staff2);
            }

            // Seed Sample Medical Records if empty
            if (medicalRepository.count() == 0) {
                Medical med = new Medical();
                med.setVet("Dr. Sarah Conner - City Vet Clinic");
                med.setNotes("Annual checkup complete. Vaccinations up to date.");
                med.setHas_restrictions(false);
                med.setLast_apt(new Date());
                med.setNext_apt(new Date(System.currentTimeMillis() + 86400000L * 180));
                medicalRepository.save(med);
            }

            // Seed Sample Intake if empty
            if (intakeRepository.count() == 0 && animalRepository.count() > 0) {
                Animal animal = animalRepository.findAll().get(0);
                Staff staff = staffRepository.findAll().isEmpty() ? null : staffRepository.findAll().get(0);

                Intake intake = new Intake();
                intake.setIntake_date(new Date());
                intake.setTYPE(Animal_type.DOG);
                intake.setNeeds_medical(false);
                intake.setAnimal(animal);
                intake.setIntake_staff_member(staff);
                intakeRepository.save(intake);
            }
        };
    }
}
