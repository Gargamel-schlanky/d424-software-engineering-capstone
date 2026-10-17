package com.D424.capstone.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "intake")
public class Intake extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "intake_date")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date intake_date;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff intake_staff_member;

    @Column(name = "needs_medical")
    private Boolean needs_medical;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_type")
    public Animal_type TYPE;

    @ManyToOne
    @JoinColumn(name = "animal_id", nullable = true)
    private Animal animal;

    public Intake(){}

    public Intake(Long id, Date intake_date, Staff intake_staff_member, Boolean needs_medical, Animal_type TYPE) {
        this.id = id;
        this.intake_date = intake_date;
        this.intake_staff_member = intake_staff_member;
        this.needs_medical = needs_medical;
        this.TYPE = TYPE;
    }

    // Polymorphism: Method overriding
    @Override
    public String getDisplaySummary() {
        return "Intake ID: " + id + " on " + intake_date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getIntake_date() {
        return intake_date;
    }

    public void setIntake_date(Date intake_date) {
        this.intake_date = intake_date;
    }

    public Staff getIntake_staff_member() {
        return intake_staff_member;
    }

    public void setIntake_staff_member(Staff intake_staff_member) {
        this.intake_staff_member = intake_staff_member;
    }

    public Boolean getNeeds_medical() {
        return needs_medical;
    }

    public void setNeeds_medical(Boolean needs_medical) {
        this.needs_medical = needs_medical;
    }

    public Animal_type getTYPE() {
        return TYPE;
    }

    public void setTYPE(Animal_type TYPE) {
        this.TYPE = TYPE;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
