package com.skillstorm.Project1.models;
import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "warehouse_item")
public class WarehouseItem {

    /* Entity class specifying the columns of the warehouse_item table */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_item_id")
    private Long warehouseItemId;

    @NotNull
    @Column(name = "warehouse_id")
    private Long warehouseId;

    @NotNull
    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "quantity")
    @NotNull
    @Min(value = 0, message = "Quantity must be greater than zero")
    private Integer quantity;
    public WarehouseItem() {

    }
    public WarehouseItem(Integer quantity, Long w, Long i) {
        this.quantity = quantity;
        this.warehouseId = w;
        this.itemId = i;
    }

    public WarehouseItem(long id, Integer quantity, Long w, Long i) {
        this.warehouseItemId = id;
        this.quantity = quantity;
        this.warehouseId = w;
        this.itemId = i;
    }
    public Long getwarehouse_Item_Id() {
        return warehouseItemId;
    }

    public void setwarehouse_Item_Id(Long warehouseItemId) {
        this.warehouseItemId = warehouseItemId;
    }

    public Long getwarehouse_Id() {
        return warehouseId;
    }

    public void setwarehouse_Id(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Long getitem_Id() {
        return itemId;
    }

    public void setitem_Id(Long itemId) {
        this.itemId = itemId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((warehouseItemId == null) ? 0 : warehouseItemId.hashCode());
        result = prime * result + ((warehouseId == null) ? 0 : warehouseId.hashCode());
        result = prime * result + ((itemId == null) ? 0 : itemId.hashCode());
        result = prime * result + ((quantity == null) ? 0 : quantity.hashCode());
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
        WarehouseItem other = (WarehouseItem) obj;
        if (warehouseItemId == null) {
            if (other.warehouseItemId != null)
                return false;
        } else if (!warehouseItemId.equals(other.warehouseItemId))
            return false;
        if (warehouseId == null) {
            if (other.warehouseId != null)
                return false;
        } else if (!warehouseId.equals(other.warehouseId))
            return false;
        if (itemId == null) {
            if (other.itemId != null)
                return false;
        } else if (!itemId.equals(other.itemId))
            return false;
        if (quantity == null) {
            if (other.quantity != null)
                return false;
        } else if (!quantity.equals(other.quantity))
            return false;
        return true;
    }
}
