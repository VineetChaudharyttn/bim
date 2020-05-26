package com.ttn.bim.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.util.Date;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
public class IssuedBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "book_id")
    @Fetch(FetchMode.JOIN)
    private Book book;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    @Fetch(FetchMode.JOIN)
    private User user;

    private Date dateOut;

    private Date dateDue;

    private Date dateIn;

    public Integer getTransactionId() {
        return transactionId;
    }

    public IssuedBook setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
        return this;
    }

    public Book getBook() {
        return book;
    }

    public IssuedBook setBook(Book book) {
        this.book = book;
        return this;
    }

    public User getUser() {
        return user;
    }

    public IssuedBook setUser(User user) {
        this.user = user;
        return this;
    }

    public Date getDateOut() {
        return dateOut;
    }

    public IssuedBook setDateOut(Date dateOut) {
        this.dateOut = dateOut;
        return this;
    }

    public Date getDateDue() {
        return dateDue;
    }

    public IssuedBook setDateDue(Date dateDue) {
        this.dateDue = dateDue;
        return this;
    }

    public Date getDateIn() {
        return dateIn;
    }

    public IssuedBook setDateIn(Date dateIn) {
        this.dateIn = dateIn;
        return this;
    }
}
