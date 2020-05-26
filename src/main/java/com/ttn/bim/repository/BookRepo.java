package com.ttn.bim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttn.bim.entity.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Integer> {
    List<Book> findAll();

    List<Book> findByBookIdIn(List<Integer> issuedBookIds);

    List<Book> findByBookIdNotIn(List<Integer> issuedBookIds);
}
