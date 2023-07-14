package com.skillstorm.Project1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.Project1.models.WarehouseItem;
import com.skillstorm.Project1.services.WarehouseItemService;



@RestController

@RequestMapping("/warehouseItems")

@CrossOrigin
public class WarehouseItemController {
    @Autowired
    WarehouseItemService warehouseItemService;

    @GetMapping
    public ResponseEntity<List<WarehouseItem>> findAll() {
        List<WarehouseItem> warehouseItems = warehouseItemService.findAll();

        return new ResponseEntity<List<WarehouseItem>>(warehouseItems, HttpStatus.OK);
    }
    @PostMapping("/warehouseItem")
    public ResponseEntity<WarehouseItem> createItem(@Valid @RequestBody WarehouseItem warehouseItem) {
        //System.out.println(warehouse.getWarehouseName());
        WarehouseItem wi = warehouseItemService.saveWarehouseItem(warehouseItem);
        return new ResponseEntity<WarehouseItem>(wi, HttpStatus.CREATED);
    }
    @PutMapping("/warehouseItem")
    public ResponseEntity<WarehouseItem> updateItem(@RequestBody WarehouseItem warehouseItem) {
        WarehouseItem wi = warehouseItemService.saveWarehouseItem(warehouseItem);
        return new ResponseEntity<WarehouseItem>(wi, HttpStatus.OK);
    }
    @DeleteMapping("/warehouseItem") 
    public ResponseEntity<WarehouseItem> deleteItem(@RequestBody WarehouseItem item) {
        
        warehouseItemService.deleteItem(item);
        return ResponseEntity.noContent().build();
    }
}
