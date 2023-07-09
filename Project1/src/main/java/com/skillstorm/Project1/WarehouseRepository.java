package com.skillstorm.Project1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    // Custom query methods can be added here if needed

}