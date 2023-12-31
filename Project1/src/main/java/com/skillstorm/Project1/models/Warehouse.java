package com.skillstorm.Project1.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "warehouse")
public class Warehouse {

    /* Entity class specifying the columns of the warehouse table */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @NotEmpty
    @Column(name = "warehouse_name")
    private String warehouseName;

    @NotEmpty
    @Column(name = "warehouse_location")
    private String warehouseLocation;

    public Warehouse() {
        
    }

    public Warehouse(String name, String location) {
        this.warehouseName = name;
        this.warehouseLocation = location;
    }

    public Warehouse(long id, String name, String location) {
        this.warehouseId = id;
        this.warehouseName = name;
        this.warehouseLocation = location;
    }

    public Long getwarehouse_Id() {
        return warehouseId;
    }

    public void setwarehouse_Id(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getwarehouse_Name() {
        return warehouseName;
    }

    public void setwarehouse_Name(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getwarehouse_Location() {
        return warehouseLocation;
    }

    public void setwarehouse_Location(String warehouseLocation) {
        this.warehouseLocation = warehouseLocation;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((warehouseId == null) ? 0 : warehouseId.hashCode());
        result = prime * result + ((warehouseName == null) ? 0 : warehouseName.hashCode());
        result = prime * result + ((warehouseLocation == null) ? 0 : warehouseLocation.hashCode());
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
        Warehouse other = (Warehouse) obj;
        if (warehouseId == null) {
            if (other.warehouseId != null)
                return false;
        } else if (!warehouseId.equals(other.warehouseId))
            return false;
        if (warehouseName == null) {
            if (other.warehouseName != null)
                return false;
        } else if (!warehouseName.equals(other.warehouseName))
            return false;
        if (warehouseLocation == null) {
            if (other.warehouseLocation != null)
                return false;
        } else if (!warehouseLocation.equals(other.warehouseLocation))
            return false;
        return true;
    }
}