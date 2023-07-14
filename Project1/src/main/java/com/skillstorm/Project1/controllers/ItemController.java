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

import com.skillstorm.Project1.models.Item;
import com.skillstorm.Project1.services.ItemService;

@RestController

@RequestMapping("/items")

@CrossOrigin

public class ItemController {

    @Autowired
    ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> findAll() {
        List<Item> items = itemService.findAll();

        return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
    }
    @PostMapping("/item")
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        //System.out.println(warehouse.getWarehouseName());
        Item i = itemService.saveItem(item);
        return new ResponseEntity<Item>(i, HttpStatus.CREATED);
    }
    @PutMapping("/item")
    public ResponseEntity<Item> updateItem(@RequestBody Item item) {
        Item i = itemService.saveItem(item);
        return new ResponseEntity<Item>(i, HttpStatus.OK);
    }
    @DeleteMapping("/item") 
    public ResponseEntity<Item> deleteItem(@RequestBody Item item) {
        
        itemService.deleteItem(item);
        return ResponseEntity.noContent().build();
    }
}