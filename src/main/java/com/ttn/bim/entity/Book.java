package com.ttn.bim.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;

    private String bookName;

    private String authorName;

    private Integer noOfCopies;

    private String publication;

    private String edition;

    public Integer getBookId() {
        return bookId;
    }

    public Book setBookId(Integer bookId) {
        this.bookId = bookId;
        return this;
    }

    public String getBookName() {
        return bookName;
    }

    public Book setBookName(String bookName) {
        this.bookName = bookName;
        return this;
    }

    public String getAuthorName() {
        return authorName;
    }

    public Book setAuthorName(String authorName) {
        this.authorName = authorName;
        return this;
    }

    public Integer getNoOfCopies() {
        return noOfCopies;
    }

    public Book setNoOfCopies(Integer noOfCopies) {
        this.noOfCopies = noOfCopies;
        return this;
    }

    public String getPublication() {
        return publication;
    }

    public Book setPublication(String publication) {
        this.publication = publication;
        return this;
    }

    public String getEdition() {
        return edition;
    }

    public Book setEdition(String edition) {
        this.edition = edition;
        return this;
    }
}
