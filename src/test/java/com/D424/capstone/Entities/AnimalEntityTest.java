package com.D424.capstone.Entities;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class AnimalEntityTest {

    @Test
    @DisplayName("Test Animal entity encapsulation and getters/setters")
    public void testAnimalEncapsulation() {
        Animal animal = new Animal();
        animal.setId(1L);
        animal.setName("Buddy");
        animal.setAge("2 years");
        animal.setDescription("Golden Retriever mix");
        animal.setMedical_id(101);
        animal.setAdoptable(true);
        animal.setCurrent_resident(true);
        animal.setPhotoUrl("data:image/png;base64,testdata");

        assertEquals(1L, animal.getId());
        assertEquals("Buddy", animal.getName());
        assertEquals("2 years", animal.getAge());
        assertEquals("Golden Retriever mix", animal.getDescription());
        assertEquals(101, animal.getMedical_id());
        assertTrue(animal.getAdoptable());
        assertTrue(animal.getCurrent_resident());
        assertEquals("data:image/png;base64,testdata", animal.getPhotoUrl());
    }

    @Test
    @DisplayName("Test Animal inheritance and polymorphism")
    public void testAnimalPolymorphism() {
        BaseEntity animal = new Animal(2L, "Whiskers", "1 year");
        assertEquals("Animal: Whiskers (ID: 2)", animal.getDisplaySummary());
        assertEquals("System", animal.getCreatedBy());
    }
}
