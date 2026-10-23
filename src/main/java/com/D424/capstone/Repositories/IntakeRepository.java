package com.D424.capstone.Repositories;

import com.D424.capstone.Entities.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
public interface IntakeRepository extends JpaRepository<Intake, Long> {
}
