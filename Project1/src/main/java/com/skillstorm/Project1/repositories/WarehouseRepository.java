package com.skillstorm.Project1.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skillstorm.Project1.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {

    // Custom query methods can be added here if needed
    @Query("select * from warehouse where warehouse_location = :location")
    public Optional<List<Warehouse>> findWarehousesByLocation(String location);

    @Query("update Warehouse w set w.name = :new_name where id = :warehouse_id")
    @Modifying
    @Transactional
    public int updateWarehouseName(@Param("warehouse_id") long id, @Param("warehouse_name") String newName);
}