package com.D424.capstone.Repositories;

import com.D424.capstone.Entities.Medical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRepository extends JpaRepository<Medical, Integer> {
}
