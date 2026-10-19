package com.D424.capstone.Entities;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class StaffEntityTest {

    @Test
    @DisplayName("Test Staff entity encapsulation, getters, setters, and display summary")
    public void testStaffEntity() {
        Staff staff = new Staff();
        Date hireDate = new Date();
        staff.setId(1);
        staff.setName("Alice");
        staff.setPhone("555-1234");
        staff.setPosition("Manager");
        staff.setHire_date(hireDate);
        staff.setOn_call_duty(true);

        assertEquals(1, staff.getId());
        assertEquals("Alice", staff.getName());
        assertEquals("555-1234", staff.getPhone());
        assertEquals("Manager", staff.getPosition());
        assertEquals(hireDate, staff.getHire_date());
        assertTrue(staff.getOn_call_duty());
        assertEquals("Staff Member: Alice (Manager)", staff.getDisplaySummary());
    }
}
