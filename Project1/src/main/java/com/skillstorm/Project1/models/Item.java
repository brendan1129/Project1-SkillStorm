package com.skillstorm.Project1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "item")
public class Item {

    /* Entity class specifying the columns of the item table */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;

    @NotEmpty
    @Column(name = "item_name")
    private String itemName;

    @NotEmpty
    @Column(name = "item_description")
    private String itemDescription;

    @NotNull
    @Column(name = "unit_price")
    @Min(value = 0, message = "Unit price must be greater than zero")
    private Double unitPrice;


    public Item() {
        
    }

    public Item(String name, String description, double price) {
        this.itemName = name;
        this.itemDescription = description;;
        this.unitPrice = price;
    }

    public Item(long id, String name, String description, double price) {
        this.itemId = id;
        this.itemName = name;
        this.itemDescription = description;
        this.unitPrice = price;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((itemId == null) ? 0 : itemId.hashCode());
        result = prime * result + ((itemName == null) ? 0 : itemName.hashCode());
        result = prime * result + ((itemDescription == null) ? 0 : itemDescription.hashCode());
        result = prime * result + ((unitPrice == null) ? 0 : unitPrice.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Item other = (Item) obj;
        if (itemId == null) {
            if (other.itemId != null)
                return false;
        } else if (!itemId.equals(other.itemId))
            return false;
        if (itemName == null) {
            if (other.itemName != null)
                return false;
        } else if (!itemName.equals(other.itemName))
            return false;
        if (itemDescription == null) {
            if (other.itemDescription != null)
                return false;
        } else if (!itemDescription.equals(other.itemDescription))
            return false;
        if (unitPrice == null) {
            if (other.unitPrice != null)
                return false;
        } else if (!unitPrice.equals(other.unitPrice))
            return false;
        return true;
    }

    public Long getitem_Id() {
        return itemId;
    }

    public void setitem_Id(Long itemId) {
        this.itemId = itemId;
    }

    public String getitem_Name() {
        return itemName;
    }

    public void setitem_Name(String itemName) {
        this.itemName = itemName;
    }

    public String getitem_Description() {
        return itemDescription;
    }

    public void setitem_Description(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public Double getunit_Price() {
        return unitPrice;
    }

    public void setunit_Price(Double unitPrice) {
        this.unitPrice = unitPrice;
    }
}
