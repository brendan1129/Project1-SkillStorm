package com.skillstorm.Project1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

    // Custom query methods can be added here if needed

}
