package com.skillstorm.Project1.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.Project1.models.Warehouse;
import com.skillstorm.Project1.services.WarehouseService;

@RestController

@RequestMapping("/warehouses")

@CrossOrigin

public class WarehouseController {

    /* Handle GET, POST, PUT and DELETE Requests using warehouseService */

    @Autowired
    WarehouseService warehouseService;

    // Get Mapping tells Spring we are going to respond to GET requests with the following method
    @GetMapping
    public ResponseEntity<List<Warehouse>> findAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAllWarehouses();

        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);
    }

    @GetMapping("/warehouse/{warehouse_id}")
    public ResponseEntity<Warehouse> findWarehouseById(@PathVariable("warehouse_id") long warehouse_id) {
        Warehouse warehouse = warehouseService.findWarehouseById(warehouse_id);
        return new ResponseEntity<Warehouse>(warehouse, HttpStatus.OK);
    }
    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@Valid @RequestBody Warehouse warehouse) {
        //System.out.println(warehouse.getWarehouseName());
        if (warehouse.getwarehouse_Name() == null || warehouse.getwarehouse_Location() == null) {
            // Return a response indicating missing fields
            return ResponseEntity.badRequest().build();
        }
        Warehouse w = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(w, HttpStatus.CREATED);
    }

    @PutMapping("/warehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse w = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(w, HttpStatus.OK);
    }
    @DeleteMapping("/warehouse") 
    public ResponseEntity<Warehouse> deleteWarehouse(@RequestBody Warehouse warehouse) {
        
        warehouseService.deleteWarehouse(warehouse);
        return ResponseEntity.noContent().build();
    }
    // Other API endpoints and methods as needed
}