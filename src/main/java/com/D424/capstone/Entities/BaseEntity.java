package com.D424.capstone.Entities;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity {

    // Encapsulation: Private / Protected attributes
    protected String createdBy = "System";

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    // Polymorphism: Abstract or overridable method for entity summary
    public String getDisplaySummary() {
        return "Entity Record";
    }
}
