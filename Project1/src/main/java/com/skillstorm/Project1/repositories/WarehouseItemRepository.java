package com.skillstorm.Project1.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillstorm.Project1.models.WarehouseItem;

public interface WarehouseItemRepository extends JpaRepository<WarehouseItem, Long> {

    // Custom query methods can be added here if needed

}
