package com.skillstorm.Project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.Project1.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // Custom query methods can be added here if needed
    // Repository class for CRUD operations to be implemented by ItemService
}
