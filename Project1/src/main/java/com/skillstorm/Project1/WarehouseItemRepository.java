package com.skillstorm.Project1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehouseItemRepository extends JpaRepository<WarehouseItem, Long> {

    // Custom query methods can be added here if needed

}
