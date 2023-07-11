package com.skillstorm.Project1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.Project1.models.Warehouse;
import com.skillstorm.Project1.services.WarehouseService;

@RestController

@RequestMapping("/warehouses")

@CrossOrigin

public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

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


    @GetMapping("/location/{warehouse_location}")
    public ResponseEntity<List<Warehouse>> findWarehousesByLocation(@PathVariable("warehouse_location") String warehouse_location) {

        List<Warehouse> warehouses = warehouseService.findByLocation(warehouse_location);

        if(warehouses == null) {
            return ResponseEntity.noContent().build();
        }

        return new ResponseEntity<List<Warehouse>>(warehouses, HttpStatus.OK);

    }
    @PostMapping("/warehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse) {
        //System.out.println(warehouse.getWarehouseName());
        Warehouse w = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(w, HttpStatus.CREATED);
    }

    @PutMapping("/warehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse warehouse) {
        Warehouse w = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<Warehouse>(w, HttpStatus.OK);
    }

    @PutMapping("/warehouse/updateName") 
    public ResponseEntity<Integer> updateWarehouseName(@RequestBody Warehouse warehouse, @RequestParam String newName) {
        
        int updated = warehouseService.updateWarehouseName(warehouse, newName);
        return new ResponseEntity<Integer>(updated, HttpStatus.OK);
    }

    // Other API endpoints and methods as needed
}