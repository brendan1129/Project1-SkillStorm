package com.skillstorm.Project1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.Project1.models.WarehouseItem;
import com.skillstorm.Project1.repositories.WarehouseItemRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WarehouseItemService {

    // Service class for defining the sepecific behavior of each warehouse item repository query
    @Autowired
    WarehouseItemRepository warehouseItemRepository;

    public WarehouseItem saveWarehouseItem(WarehouseItem warehouseItem) {
        return warehouseItemRepository.save(warehouseItem);
    }

    public List<WarehouseItem> findAll() {
        return warehouseItemRepository.findAll();
    }

    public WarehouseItem getItemById(Long id) {
        return warehouseItemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Warehouse Item not found"));
    }
    public void deleteItem(WarehouseItem warehouseItem) {
        warehouseItemRepository.delete(warehouseItem);
    }
}
