package com.D424.capstone.Entities;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class MedicalEntityTest {

    @Test
    @DisplayName("Test Medical entity getters, setters, and display summary")
    public void testMedicalEntity() {
        Medical medical = new Medical();
        medical.setId(101);
        medical.setVet("Dr. Smith");
        medical.setNotes("Routine checkup");
        medical.setHas_restrictions(false);

        Date lastApt = new Date();
        Date nextApt = new Date(System.currentTimeMillis() + 86400000L * 30);
        medical.setLast_apt(lastApt);
        medical.setNext_apt(nextApt);

        assertEquals(101, medical.getId());
        assertEquals("Dr. Smith", medical.getVet());
        assertEquals("Routine checkup", medical.getNotes());
        assertFalse(medical.getHas_restrictions());
        assertEquals(lastApt, medical.getLast_apt());
        assertEquals(nextApt, medical.getNext_apt());
        assertEquals("Medical Visit with Dr. Smith", medical.getDisplaySummary());
    }
}
