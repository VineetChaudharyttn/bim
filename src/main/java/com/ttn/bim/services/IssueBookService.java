package com.ttn.bim.services;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ttn.bim.entity.Book;
import com.ttn.bim.entity.IssuedBook;
import com.ttn.bim.repository.BookRepo;
import com.ttn.bim.repository.IssueBookRepo;
import com.ttn.bim.repository.UserRepo;

@Service
public class IssueBookService {

    @Autowired
    IssueBookRepo issueBookRepo;

    @Autowired
    BookRepo bookRepo;

    @Autowired
    UserRepo userRepo;

    public List<Book> fetchIssuedBooks() {
        List<IssuedBook> issuedBooks = issueBookRepo.findAllByDateInNull();
        Map<Book, List<IssuedBook>> issuedBookMap = issuedBooks.stream().collect(Collectors.groupingBy(IssuedBook::getBook));
        return issuedBookMap.entrySet().stream().map(book -> {
            book.getKey().setNoOfCopies(book.getValue().size());
            return book.getKey();
        }).sorted(Comparator.comparing(Book::getBookName)).collect(Collectors.toList());
    }

    public List<Book> fetchAvailableBooks() {
        List<IssuedBook> issuedBooks = issueBookRepo.findAllByDateInNull();
        List<Book> bookList = bookRepo.findByBookIdNotIn(issuedBooks.stream().map(IssuedBook::getBook).map(Book::getBookId).collect(Collectors.toList()));
        Map<Book, List<IssuedBook>> bookListMap = issuedBooks.stream().collect(Collectors.groupingBy(IssuedBook::getBook));
        bookListMap.entrySet().stream().forEach(book -> {
            int noOfCopies = book.getKey().getNoOfCopies();
            book.getKey().setNoOfCopies(noOfCopies-book.getValue().size());
            bookList.add(book.getKey());
        });
        bookList.sort(Comparator.comparing(Book::getBookName));
        return bookList;
    }
}
