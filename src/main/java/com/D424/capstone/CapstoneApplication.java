package com.D424.capstone;

import com.D424.capstone.Controllers.AnimalController;
import com.D424.capstone.Entities.Animal;
import com.D424.capstone.Repositories.AnimalRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackageClasses = {CapstoneApplication.class, AnimalController.class})
@EnableJpaRepositories(basePackageClasses = {AnimalRepository.class})
@EntityScan(basePackageClasses = {Animal.class})
public class CapstoneApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstoneApplication.class, args);
	}

}
