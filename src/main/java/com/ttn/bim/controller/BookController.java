package com.ttn.bim.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttn.bim.entity.Book;
import com.ttn.bim.repository.BookRepo;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    BookRepo bookRepo;

    @GetMapping
    public List<Book> book() {
        List<Book> bookList= bookRepo.findAll();
        bookList.sort(Comparator.comparing(Book::getBookName));
        return bookList;
    }

    @PostMapping
    public String createBook() {
        return "Book created";
    }

    @PutMapping
    public String updateBook() {
        return "Update Book";
    }

    @DeleteMapping
    public String deleteBook() {
        return "Book delete";
    }

}
