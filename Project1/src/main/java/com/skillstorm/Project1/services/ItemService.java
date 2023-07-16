package com.skillstorm.Project1.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.Project1.models.Item;
import com.skillstorm.Project1.repositories.ItemRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ItemService {

    // Service class for defining the sepecific behavior of each item repository query
    @Autowired
    ItemRepository itemRepository;

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Item not found"));
    }
    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
    // Other methods as needed
}
