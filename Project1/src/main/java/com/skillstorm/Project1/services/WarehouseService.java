package com.skillstorm.Project1.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.Project1.models.Warehouse;
import com.skillstorm.Project1.repositories.WarehouseRepository;

@Service
public class WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    public Warehouse saveWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public List<Warehouse> findAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public Warehouse findWarehouseById(Long id) {
        Optional<Warehouse> warehouse = warehouseRepository.findById(id);

        if(warehouse.isPresent()) {
            return warehouse.get();
        }

        return null;
    }
    public List<Warehouse> findWarehouseByLocation(String location) {
        Optional<List<Warehouse>> warehouses = warehouseRepository.findWarehouseByLocation(location);

        if(warehouses.isPresent()) {
            return warehouses.get();
        }

        return null;
    }
    public int updateWarehouseName(Warehouse warehouse, String newName) {
        return warehouseRepository.updateWarehouseName(warehouse.getWarehouseId(), newName);
    }
    // Other methods as needed
}

