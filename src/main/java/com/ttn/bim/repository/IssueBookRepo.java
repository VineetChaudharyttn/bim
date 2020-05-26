package com.ttn.bim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttn.bim.entity.IssuedBook;

public interface IssueBookRepo extends JpaRepository<IssuedBook, Integer> {

    List<IssuedBook> findAllByDateInNull();
}
