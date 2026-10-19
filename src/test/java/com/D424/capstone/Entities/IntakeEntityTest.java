package com.D424.capstone.Entities;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class IntakeEntityTest {

    @Test
    @DisplayName("Test Intake entity encapsulation and relationships")
    public void testIntakeEncapsulation() {
        Intake intake = new Intake();
        Date now = new Date();
        intake.setId(10L);
        intake.setIntake_date(now);
        intake.setTYPE(Animal_type.DOG);
        intake.setNeeds_medical(false);

        Animal animal = new Animal(1L, "Max", "3 years");
        intake.setAnimal(animal);

        Staff staff = new Staff("Jane Doe", now);
        intake.setIntake_staff_member(staff);

        assertEquals(10L, intake.getId());
        assertEquals(now, intake.getIntake_date());
        assertEquals(Animal_type.DOG, intake.getTYPE());
        assertFalse(intake.getNeeds_medical());
        assertNotNull(intake.getAnimal());
        assertEquals("Max", intake.getAnimal().getName());
        assertNotNull(intake.getIntake_staff_member());
        assertEquals("Jane Doe", intake.getIntake_staff_member().getName());
    }

    @Test
    @DisplayName("Test Intake inheritance and polymorphism")
    public void testIntakePolymorphism() {
        Date now = new Date();
        BaseEntity intake = new Intake(5L, now, null, true, Animal_type.CAT);
        assertTrue(intake.getDisplaySummary().contains("Intake ID: 5"));
    }
}
