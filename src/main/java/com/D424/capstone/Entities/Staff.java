package com.D424.capstone.Entities;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "staff")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "phone_number")
    private String phone;
    @Column(name = "job_title")
    private String position;
    @Column(name = "hire_date")
    private Date hire_date;
    @Column(name = "on_call")
    private Boolean on_call_duty;

    public Staff(){}

    public Staff(String name, Date hire_date) {
        this.name = name;
        this.hire_date = hire_date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Date getHire_date() {
        return hire_date;
    }

    public void setHire_date(Date hire_date) {
        this.hire_date = hire_date;
    }

    public Boolean getOn_call_duty() {
        return on_call_duty;
    }

    public void setOn_call_duty(Boolean on_call_duty) {
        this.on_call_duty = on_call_duty;
    }
}
