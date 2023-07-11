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
    @Query("select w from Warehouse w where w.warehouseLocation = :location")
    public Optional<List<Warehouse>> findByLocation(@Param("location") String location);

    @Query(value = "update warehouse w set w.warehouse_name = :new_name where w.warehouse_id = :warehouse_id", nativeQuery = true)
    @Modifying
    @Transactional
    public int updateWarehouseName(@Param("warehouse_id") long id, @Param("new_name") String newName);
}