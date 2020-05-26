package com.ttn.bim.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttn.bim.entity.Book;
import com.ttn.bim.services.IssueBookService;

@RestController
@RequestMapping("/api/issueBook")
public class IssueBookController {

    @Autowired
    IssueBookService issueBookService;

    @GetMapping("/issued")
    public List<Book> getIssuedBook(){
        return issueBookService.fetchIssuedBooks();
    }

    @GetMapping("/available")
    public List<Book> getAvailableBook(){
        return issueBookService.fetchAvailableBooks();
    }
}
