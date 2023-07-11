package com.skillstorm.Project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.Project1.models.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

    // Custom query methods can be added here if needed

}
