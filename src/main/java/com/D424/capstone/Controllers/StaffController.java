package com.D424.capstone.Controllers;

import com.D424.capstone.Entities.Staff;
import com.D424.capstone.Repositories.StaffRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin
public class StaffController {

    private final StaffRepository staffRepository;

    public StaffController(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable int id) {
        return staffRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Staff createStaff(@RequestBody Staff staff) {
        return staffRepository.save(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable int id, @RequestBody Staff staff) {
        staff.setId(id);
        return staffRepository.save(staff);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable int id) {
        staffRepository.deleteById(id);
    }
}
