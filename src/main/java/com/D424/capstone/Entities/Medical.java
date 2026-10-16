package com.D424.capstone.Entities;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "medical")
public class Medical {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "vet")
    private String vet;
    @Column(name ="notes")
    private String notes;
    @Column(name = " has_restrictions")
    private Boolean has_restrictions;
    @Column(name = "last_appointment")
    private Date last_apt;
    @Column(name = "next_appointment")
    private Date next_apt;

    public Medical (){};

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVet() {
        return vet;
    }

    public void setVet(String vet) {
        this.vet = vet;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Boolean getHas_restrictions() {
        return has_restrictions;
    }

    public void setHas_restrictions(Boolean has_restrictions) {
        this.has_restrictions = has_restrictions;
    }

    public Date getLast_apt() {
        return last_apt;
    }

    public void setLast_apt(Date last_apt) {
        this.last_apt = last_apt;
    }

    public Date getNext_apt() {
        return next_apt;
    }

    public void setNext_apt(Date next_apt) {
        this.next_apt = next_apt;
    }
}
