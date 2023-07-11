package com.skillstorm.Project1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.Project1.models.WarehouseItem;
import com.skillstorm.Project1.repositories.WarehouseItemRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WarehouseItemService {

    private final WarehouseItemRepository warehouseItemRepository;

    @Autowired
    public WarehouseItemService(WarehouseItemRepository warehouseItemRepository) {
        this.warehouseItemRepository = warehouseItemRepository;
    }

    public WarehouseItem saveWarehouseItem(WarehouseItem warehouseItem) {
        return warehouseItemRepository.save(warehouseItem);
    }

    public List<WarehouseItem> getAllWarehouseItems() {
        return warehouseItemRepository.findAll();
    }

    public WarehouseItem getWarehouseItemById(Long id) {
        return warehouseItemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("WarehouseItem not found"));
    }

    // Other methods as needed
}
