package com.D424.capstone.Entities;

import jakarta.persistence.*;
import org.springframework.context.annotation.Primary;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "animal")

public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "age")
    private String age;
    @Column(name = "description")
    private String description;
    @Column(name = "medical_id")
    private int medical_id;
    @Column(name="adoptable")
    private Boolean adoptable;
    @Column(name = "current_resident")
    private Boolean current_resident;

    @OneToMany(mappedBy = "animal")
    private List<Intake> intakes = new ArrayList<>();

    public Animal(Long id, String name, String age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Animal() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Intake> getIntakes() {
        return intakes;
    }

    public void setIntakes(List<Intake> intakes) {
        this.intakes = intakes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }


    public int getMedical_id() {
        return medical_id;
    }

    public void setMedical_id(int medical_id) {
        this.medical_id = medical_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Boolean getAdoptable() {
        return adoptable;
    }

    public void setAdoptable(Boolean adoptable) {
        this.adoptable = adoptable;
    }

    public Boolean getCurrent_resident() {
        return current_resident;
    }

    public void setCurrent_resident(Boolean current_resident) {
        this.current_resident = current_resident;
    }
}
