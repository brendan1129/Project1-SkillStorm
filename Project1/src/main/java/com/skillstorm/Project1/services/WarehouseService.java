package com.skillstorm.Project1.services;

import java.util.List;
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

    public Warehouse updateWarehouse(Warehouse updatedWarehouse) {
        // Retrieve the existing warehouse from the database using its ID
        Optional<Warehouse> existingWarehouse = warehouseRepository.findById(updatedWarehouse.getwarehouse_Id());

        // Update the attributes of the existing warehouse
        if(existingWarehouse.isPresent()){
        Warehouse w = existingWarehouse.get();
        w.setwarehouse_Name(updatedWarehouse.getwarehouse_Name());
        w.setwarehouse_Location(updatedWarehouse.getwarehouse_Location());
        return w;
        }
        // Save the modified warehouse back to the database
        return null;
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
    public List<Warehouse> findByLocation(String location) {
        Optional<List<Warehouse>> warehouses = warehouseRepository.findByLocation(location);

        if(warehouses.isPresent()) {
            return warehouses.get();
        }

        return null;
    }
    public int updateWarehouseName(Warehouse warehouse, String newName) {
        return warehouseRepository.updateWarehouseName(warehouse.getwarehouse_Id(), newName);
    }
    
    public void deleteWarehouse(Warehouse warehouse) {
        warehouseRepository.delete(warehouse);
    }
}

