const WURL = 'http://localhost:8080/warehouses';
const IURL = 'http://localhost:8080/items';
const WIURL = 'http://localhost:8080/warehouseItems';
let allWarehouses = [];
let allItems = [];
let allWarehouseItems = [];
/* Generate HTTP GET request with the URL where the database is being hosted.
If the readyState of the request is 4 ( Content Loaded ), then we parse in a JSON object
that represents all current Warehouses in the DB and adds them to the front-end table. */
document.addEventListener('DOMContentLoaded', () => {
//waits for the HTML document to be fully loaded before executing the provided callback function
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
    // when ready state changes
        if(xhr.readyState === 4 && xhr.status == 200) {
            // if the ready state is loaded and the repsonse status is 200 ( success )
            let warehouses = JSON.parse(xhr.responseText);
            // get a JSON representation of the object
            warehouses.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse);
            });
        }
    };
    xhr.open('GET', WURL); // Specify it is a GET Request then send with specified Warehouse URL

    xhr.send();
});
document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status == 200) {
            let items = JSON.parse(xhr.responseText);
            items.forEach(newItem => {
                addItemToTable(newItem);
            });
        }
    };
    xhr.open('GET', IURL);

    xhr.send();
});
document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status == 200) {
            let warehouseItems = JSON.parse(xhr.responseText);
            warehouseItems.forEach(newWarehouseItem => {
                addWarehouseItemToTable(newWarehouseItem);
            });
        }
    };
    xhr.open('GET', WIURL);

    xhr.send();
});
document.getElementById('warehouse-button').addEventListener('click', (event) => {
    resetAllPages(1);
});
document.getElementById('item-button').addEventListener('click', (event) => {
    resetAllPages(2);
});
document.getElementById('warehouse-item-button').addEventListener('click', (event) => {
    resetAllPages(3);
});
/* Attempt to create a new warehouse. This parses in the values from the new warehouse form,
then performs some simple validation before sending a PostRequest with the information.
*/
document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-warehouse-form'));

    let newWarehouse = {
        warehouse_Name : inputData.get('new-warehouse-name'),
        warehouse_Location : inputData.get('new-warehouse-location')
    }
    warehouseName = newWarehouse.warehouse_Name.trim();
    warehouseLocation = newWarehouse.warehouse_Location.trim();
    // Validate warehouse name
    if (warehouseName === '' || Number.isInteger(parseInt(warehouseName))) {
        displayWarehouseErrorMessage('Please provide a valid warehouse name ( Not empty and not a number ).');
        return;
    }

    // Validate warehouse location
    if (warehouseLocation === '' || Number.isInteger(parseInt(warehouseLocation))) {
        displayWarehouseErrorMessage('Please provide a valid warehouse location ( Not empty and not a number ).');
        return;
    }
    doWarehousePostRequest(newWarehouse);
});
document.getElementById('new-item-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-item-form'));

    let newItem = {
        item_Name : inputData.get('new-item-name'),
        item_Description : inputData.get('new-item-description'),
        unit_Price : inputData.get('new-item-price')
    }
    itemName = newItem.item_Name.trim();
    itemDescription = newItem.item_Description.trim();
    itemPrice = newItem.unit_Price.trim();
    // Validate warehouse name
    if (itemName === '' || Number.isInteger(parseInt(itemName))) {
        displayItemErrorMessage('Please provide a valid item name ( Not empty and not a number ).',1);
        return;
    }
    // Validate warehouse location
    if (itemDescription === '' || Number.isInteger(parseInt(itemDescription))) {
        displayItemErrorMessage('Please provide a valid item description ( Not empty and not a number ).',1);
        return;
    }
    if (itemPrice === '' || parseFloat(itemPrice) <= -0 ) {
        displayItemErrorMessage('Please provide a valid item price ( Not empty and a positive number in the form XX.XX ).',1);
        return;
    }
    doItemPostRequest(newItem);
});
document.getElementById('new-warehouse-item-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-warehouse-item-form'));

    let newWarehouseItem = {
        warehouse_Id : inputData.get('new-warehouse-item-w-id'),
        item_Id : inputData.get('new-warehouse-item-i-id'),
        quantity : inputData.get('new-warehouse-item-quantity')
    }
    warehouse_Id = newWarehouseItem.warehouse_Id.trim();
    item_Id = newWarehouseItem.item_Id.trim();
    quantity = newWarehouseItem.quantity.trim();
    // Validate warehouse name
    if (warehouse_Id === '' || !Number.isInteger(parseInt(warehouse_Id))) {
        displayWarehouseItemErrorMessage('Please provide a valid warehouse ID ( Not empty and a number ).',1);
        return;
    }
    // Validate warehouse location
    if (item_Id === '' || !Number.isInteger(parseInt(item_Id))) {
        displayWarehouseItemErrorMessage('Please provide a valid item ID ( Not empty and a number ).',1);
        return;
    }
    if (quantity === '' || parseInt(quantity) <= -0 || parseInt(quantity) > 1000) {
        displayWarehouseItemErrorMessage('Please provide a valid warehouse item quantity ( Not empty and a positive number less than 100 ).',1);
        return;
    }

    // Check if allWarehouses and allItems have corresponding Ids, if not don't do post request
    let foundWarehouse = false;
    allWarehouses.forEach( w=> {
        if(w.warehouse_Id == warehouse_Id){
            foundWarehouse = true;
        }
    });
    let foundItem = false;
    allItems.forEach( i=> {
        if(i.item_Id == item_Id){
            foundItem = true;
        }
    });

    if(!foundWarehouse) {
        displayWarehouseItemErrorMessage('Cannot find warehouse', 1);
        return;
    }
    if(!foundItem) {
        displayWarehouseItemErrorMessage('Cannot find item', 1);
        return;
    }
    doWarehouseItemPostRequest(newWarehouseItem);
});
/* uses the mapping of our Spring project to add new warehouse to the table */
async function doWarehousePostRequest(newWarehouse) {
    let returnData = await fetch(WURL + '/warehouse', {
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(newWarehouse)
    });
    
    let warehouseJson = await returnData.json();

    console.log('WAREHOUSE JSON' + warehouseJson);

    addWarehouseToTable(warehouseJson);

    document.getElementById('new-warehouse-form').reset();
    document.getElementById('new-warehouse-error-message').style.display = 'none';
}
async function doItemPostRequest(newItem) {
    let returnData = await fetch(IURL + '/item', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newItem)
    });

    let itemJson = await returnData.json();

    console.log('ITEM JSON' + itemJson);

    addItemToTable(itemJson);
    document.getElementById('new-item-form').reset();
    document.getElementById('new-item-error-message').style.display = 'none';
}
async function doWarehouseItemPostRequest(newWarehouseItem) {
    let returnData = await fetch(WIURL + '/warehouseItem', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newWarehouseItem)
    });

    let warehouseItemJson = await returnData.json();

    console.log('WAREHOUSE ITEM JSON' + warehouseItemJson);

    addWarehouseItemToTable(warehouseItemJson);
    document.getElementById('new-warehouse-item-form').reset();
    document.getElementById('new-warehouse-item-error-message').style.display = 'none';
}
/* For use in the DOMContentLoaded event which iterates through list of JSON
objects and adds a new HTML row in the table */
function addWarehouseToTable(newWarehouse) {
    
    let tr = document.createElement('tr');
    let id = document.createElement('td');    
    let name = document.createElement('td');     
    let location = document.createElement('td');
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button

    id.innerText = newWarehouse.warehouse_Id;
    name.innerText = newWarehouse.warehouse_Name;
    location.innerText = newWarehouse.warehouse_Location;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="edit-warehouse-button" onclick="activateWarehouseEditForm(${newWarehouse.warehouse_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-warehouse-button" onclick="activateWarehouseDeleteForm(${newWarehouse.warehouse_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'warehouseTR' + newWarehouse.warehouse_Id);
    document.getElementById('warehouse-tbody').appendChild(tr);

    allWarehouses.push(newWarehouse);
}
function addItemToTable(newItem) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');    
    let name = document.createElement('td');     
    let description = document.createElement('td');
    let price = document.createElement('td');
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button


    id.innerText = newItem.item_Id;
    name.innerText = newItem.item_Name;
    description.innerText = newItem.item_Description;
    price.innerText = newItem.unit_Price;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="update-warehouse-button" onclick="activateItemEditForm(${newItem.item_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-warehouse-button" onclick="activateItemDeleteForm(${newItem.item_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'itemTR' + newItem.item_Id);

    console.log('itemTR' + newItem.item_Id);
    document.getElementById('item-tbody').appendChild(tr);

    allItems.push(newItem);
}
function addWarehouseItemToTable(newWarehouseItem) {
    let tr = document.createElement('tr');
    let id = document.createElement('td');    
    let wid = document.createElement('td');     
    let iid = document.createElement('td');
    let quantity = document.createElement('td');
    let editBtn = document.createElement('td');      // will create a <td> tag for edit button
    let deleteBtn = document.createElement('td');      // will create a <td> tag for delete button


    id.innerText = newWarehouseItem.warehouse_Item_Id;
    wid.innerText = newWarehouseItem.warehouse_Id;
    iid.innerText = newWarehouseItem.item_Id;
    quantity.innerText = newWarehouseItem.quantity;

    editBtn.innerHTML = 
    `<button class="btn btn-primary" id="update-warehouse-item-button" onclick="activateWarehouseItemEditForm(${newWarehouseItem.warehouse_Item_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-warehouse-item-button" onclick="activateWarehouseItemDeleteForm(${newWarehouseItem.warehouse_Item_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(wid);
    tr.appendChild(iid);
    tr.appendChild(quantity);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'warehouseItemTR' + newWarehouseItem.warehouse_Item_Id);

    document.getElementById('warehouse-item-tbody').appendChild(tr);

    allWarehouseItems.push(newWarehouseItem);
}
/* Resets all forms if delete warehouse is cancelled */
document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllWarehouseForms();
});
/* Resets all forms if update warehouse is cancelled */
document.getElementById('update-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllWarehouseForms();
});
/* Resets all forms if delete item is cancelled */
document.getElementById('delete-item-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllItemForms();
});
/* Resets all forms if update item is cancelled */
document.getElementById('update-item-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllItemForms();
});
document.getElementById('delete-warehouse-item-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllWarehouseItemForms();
});
/* Resets all forms if update item is cancelled */
document.getElementById('update-warehouse-item-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllWarehouseItemForms();
});
/* Sets the new warehouse form to visible and all other key elements are made invisible */
function resetAllWarehouseForms() {

    // clears data from all forms
    document.getElementById('new-warehouse-form').reset();
    document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();

    // dispalys only the new-warehouse-form
    document.getElementById('new-warehouse-form').style.display = 'block';
    document.getElementById('new-warehouse-error-message').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-error-message').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none'; 
}
function resetAllItemForms() {

    // clears data from all forms
    document.getElementById('new-item-form').reset();
    document.getElementById('update-item-form').reset();
    document.getElementById('delete-item-form').reset();

    // dispalys only the new-item-form
    document.getElementById('new-item-form').style.display = 'block';
    document.getElementById('new-item-error-message').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('update-item-error-message').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'none'; 
}
function resetAllWarehouseItemForms() {

    // clears data from all forms
    document.getElementById('new-warehouse-item-form').reset();
    document.getElementById('update-warehouse-item-form').reset();
    document.getElementById('delete-warehouse-item-form').reset();

    // dispalys only the new-item-form
    document.getElementById('new-warehouse-item-form').style.display = 'block';
    document.getElementById('new-warehouse-item-error-message').style.display = 'none';
    document.getElementById('update-warehouse-item-form').style.display = 'none';
    document.getElementById('update-warehouse-item-error-message').style.display = 'none';
    document.getElementById('delete-warehouse-item-form').style.display = 'none'; 
}
function resetAllPages(option) {
    if(option == 1) {
        document.getElementById('warehouse-form-view').style.display = 'block';
        document.getElementById('warehouse-table-view').style.display = 'block';
        document.getElementById('item-form-view').style.display = 'none';
        document.getElementById('item-table-view').style.display = 'none';
        document.getElementById('warehouse-item-form-view').style.display = 'none';
        document.getElementById('warehouse-item-table-view').style.display = 'none'
    }
    if(option == 2) {
        document.getElementById('warehouse-form-view').style.display = 'none';
        document.getElementById('warehouse-table-view').style.display = 'none';
        document.getElementById('item-form-view').style.display = 'block';
        document.getElementById('item-table-view').style.display = 'block';
        document.getElementById('warehouse-item-form-view').style.display = 'none';
        document.getElementById('warehouse-item-table-view').style.display = 'none'
    }
    if(option == 3) {
        document.getElementById('warehouse-form-view').style.display = 'none';
        document.getElementById('warehouse-table-view').style.display = 'none';
        document.getElementById('item-form-view').style.display = 'none';
        document.getElementById('item-table-view').style.display = 'none';
        document.getElementById('warehouse-item-form-view').style.display = 'block';
        document.getElementById('warehouse-item-table-view').style.display = 'block';
    }
}
function activateWarehouseEditForm(w_Id) {
    for(let w of allWarehouses) {
        if(w.warehouse_Id == w_Id) {
            document.getElementById('update-warehouse-id').value = w.warehouse_Id;
            document.getElementById('update-warehouse-name').value = w.warehouse_Name;
            document.getElementById('update-warehouse-location').value = w.warehouse_Location;
        }
    }

    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'block';
    document.getElementById('delete-warehouse-form').style.display = 'none';
    document.getElementById('new-warehouse-error-message').style.display = 'none';
}
function activateItemEditForm(i_Id) {
    for(let i of allItems) {
        if(i.item_Id == i_Id) {
            document.getElementById('update-item-id').value = i.item_Id;
            document.getElementById('update-item-name').value = i.item_Name;
            document.getElementById('update-item-description').value = i.item_Description;
            document.getElementById('update-item-price').value = i.unit_Price;
        }
    }
    document.getElementById('new-item-form').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'block';
    document.getElementById('delete-item-form').style.display = 'none';
    document.getElementById('new-item-error-message').style.display = 'none';
}
function activateWarehouseItemEditForm(i_Id) {
    for(let wi of allWarehouseItems) {
        if(wi.warehouse_Item_Id == i_Id) {
            document.getElementById('update-warehouse-item-id').value = wi.warehouse_Item_Id;
            document.getElementById('update-warehouse-item-w-id').value = wi.warehouse_Id;
            document.getElementById('update-warehouse-item-i-id').value = wi.item_Id;
            document.getElementById('update-warehouse-item-quantity').value = wi.quantity;
        }
    }
    document.getElementById('new-warehouse-item-form').style.display = 'none';
    document.getElementById('new-warehouse-item-error-message').style.display = 'none';
    document.getElementById('update-warehouse-item-form').style.display = 'block';
    document.getElementById('update-warehouse-item-error-message').style.display = 'none';
    document.getElementById('delete-warehouse-item-form').style.display = 'none';   // block is the default for showing a tag
}
function activateWarehouseDeleteForm(w_Id) {
    // find the warehouse and its <tr> that needs to be edited
    for(let w of allWarehouses) {
        if(w.warehouse_Id === w_Id) {
            document.getElementById('delete-warehouse-id').value = w.warehouse_Id;
            document.getElementById('delete-warehouse-name').value = w.warehouse_Name;
            document.getElementById('delete-warehouse-location').value = w.warehouse_Location;
        }
    }

    // showing only the edit form
    document.getElementById('new-warehouse-form').style.display = 'none';
    document.getElementById('new-warehouse-error-message').style.display = 'none';
    document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('update-warehouse-error-message').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'block';   // block is the default for showing a tag
    
}
function activateItemDeleteForm(i_Id) {
    // find the item and its <tr> that needs to be edited
    for(let i of allItems) {
        if(i.item_Id === i_Id) {
            document.getElementById('delete-item-id').value = i.item_Id;
            document.getElementById('delete-item-name').value = i.item_Name;
            document.getElementById('delete-item-description').value = i.item_Description;
            document.getElementById('delete-item-price').value = i.unit_Price;
        }
    }

    // showing only the edit form
    document.getElementById('new-item-form').style.display = 'none';
    document.getElementById('new-item-error-message').style.display = 'none';
    document.getElementById('update-item-form').style.display = 'none';
    document.getElementById('update-item-error-message').style.display = 'none';
    document.getElementById('delete-item-form').style.display = 'block';   // block is the default for showing a tag
   
}
function activateWarehouseItemDeleteForm(wi_Id) {
    // find the item and its <tr> that needs to be edited
    for(let wi of allWarehouseItems) {
        if(wi.warehouse_Item_Id === wi_Id) {
            document.getElementById('delete-warehouse-item-id').value = wi.warehouse_Item_Id;
            document.getElementById('delete-warehouse-item-w-id').value = wi.warehouse_Id;
            document.getElementById('delete-warehouse-item-i-id').value = wi.item_Id;
            document.getElementById('delete-warehouse-item-quantity').value = wi.quantity;
        }
    }

    // showing only the edit form
    document.getElementById('new-warehouse-item-form').style.display = 'none';
    document.getElementById('new-warehouse-item-error-message').style.display = 'none';
    document.getElementById('update-warehouse-item-form').style.display = 'none';
    document.getElementById('update-warehouse-item-error-message').style.display = 'none';
    document.getElementById('delete-warehouse-item-form').style.display = 'block';   // block is the default for showing a tag
   
}
document.getElementById('update-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-warehouse-form'));

    let warehouse = {
        warehouse_Id: document.getElementById('update-warehouse-id').value,
        warehouse_Name: inputData.get('update-warehouse-name'),
        warehouse_Location: inputData.get('update-warehouse-location')

    }
    // Validate warehouse name
    if (warehouse.warehouse_Name === '' || Number.isInteger(parseInt(warehouse.warehouse_Name))) {
        displayWarehouseErrorMessage('Please provide a valid warehouse name ( Not empty and not a number ).', 2);
        return;
    }

    // Validate warehouse location
    const pattern = /^\d*\.\d{2}$/;
    if (warehouse.warehouse_Location === '' || Number.isInteger(parseInt(warehouse.warehouse_Location))) {
        displayWarehouseErrorMessage('Please provide a valid warehouse location ( Not empty and a not a number ).',1);
        return;
    }

    fetch(WURL + '/warehouse', {
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {
        // this will handle all 100, 200, and 300 status code responses
        
        // we still need to serialize the response into JSON
        return data.json();
    })
    .then((warehouseJson) => {          // handling the promise returned by data.json (*** this is where we update the table ***)
        
        // adding the updated movie to our table
        updateWarehouseInTable(warehouseJson);
        
        // reset the forms
        document.getElementById('update-warehouse-form').reset();
        document.getElementById('new-warehouse-form').style.display = 'block';
        document.getElementById('update-warehouse-form').style.display = 'none';
        document.getElementById('update-warehouse-error-message').style.display = 'none';

    })
    .catch((error) => {
        // this will handle all 400 and 500 status code responses

        console.error(error);   // generally, you never want to use console.log() - especially in a production environment
        console.error(error.stack);
    })
});
document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them
    let warehouseId = document.getElementById('delete-warehouse-id').value;
    let warehouseName = document.getElementById('delete-warehouse-name').value;		
    let warehouseLocation = document.getElementById('delete-warehouse-location').value;	

    // creating the warehouse object that needs to be deleted
    let warehouse = {
        warehouse_Id : warehouseId,
        warehouse_Name : warehouseName,
        warehouse_Location : warehouseLocation,
    };

    // sending delete request
    fetch(WURL + '/warehouse', {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(warehouse)
    })
    .then((data) => {

        // delete request returns no-content so there's no need to deserialize the response and wait for that promie
        // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
        if(data.status === 204) {
            // remove warehouse from table
            removeWarehouseFromTable(warehouse);

            // resetting all forms
            resetAllWarehouseForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});
document.getElementById('update-item-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-item-form'));

    let item = {
        item_Id: document.getElementById('update-item-id').value,
        item_Name: inputData.get('update-item-name'),
        item_Description: inputData.get('update-item-description'),
        unit_Price: document.getElementById('update-item-price').value
    }
    // Validate item name
    if (item.item_Name === '' || Number.isInteger(parseInt(item.item_Name))) {
        displayItemErrorMessage('Please provide a valid item name ( Not empty and not a number ).', 2);
        return;
    }

    // Validate item location
    if (item.item_Description === '' || Number.isInteger(parseInt(item.item_Description))) {
        displayItemErrorMessage('Please provide a valid item description ( Not empty and not a number ).', 2);
        return;
    }
    if (item.unit_Price === '' || parseFloat(item.unit_Price) <= -0 ) {
        displayItemErrorMessage('Please provide a valid item price ( Not empty and a positive number in the form XX.XX ).',2);
        return;
    }

    fetch(IURL + '/item', {
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(item)
    })
    .then((data) => {
        // this will handle all 100, 200, and 300 status code responses
        
        // we still need to serialize the response into JSON
        return data.json();
    })
    .then((itemJson) => {          // handling the promise returned by data.json (*** this is where we update the table ***)
        
        // adding the updated item to our table
        updateItemInTable(itemJson);
        
        // reset the forms
        document.getElementById('update-item-form').reset();
        document.getElementById('new-item-form').style.display = 'block';
        document.getElementById('update-item-form').style.display = 'none';
        document.getElementById('update-item-error-message').style.display = 'none';

    })
    .catch((error) => {
        // this will handle all 400 and 500 status code responses
        console.error(error);
        console.error(error.stack);
    })  
});
document.getElementById('delete-item-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them
    let itemId = document.getElementById('delete-item-id').value;
    let itemName = document.getElementById('delete-item-name').value;		
    let itemDescription = document.getElementById('delete-item-description').value;	
    let itemPrice = document.getElementById('delete-item-price').value;	

    // creating the item object that needs to be deleted
    let item = {
        item_Id : itemId,
        item_Name : itemName,
        item_Description : itemDescription,
        unit_Price : itemPrice
    };

    // sending delete request
    fetch(IURL + '/item', {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(item)
    })
    .then((data) => {

        // delete request returns no-content so there's no need to deserialize the response and wait for that promie
        // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
        if(data.status === 204) {
            // remove item from table
            removeItemFromTable(item);

            // resetting all forms
            resetAllItemForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});
document.getElementById('update-warehouse-item-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = new FormData(document.getElementById('update-item-form'));

    let warehouseItem = {
        warehouse_Item_Id: document.getElementById('update-warehouse-item-id').value,
        warehouse_Id: document.getElementById('update-warehouse-item-w-id').value,
        item_Id: document.getElementById('update-warehouse-item-i-id').value,
        quantity: document.getElementById('update-warehouse-item-quantity').value
    }
    // Validate item name
    // Validate warehouse name
    if (warehouseItem.warehouse_Id === '' || !Number.isInteger(parseInt(warehouseItem.warehouse_Id))) {
        displayWarehouseItemErrorMessage('Please provide a valid warehouse ID ( Not empty and a number ).',2);
        return;
    }
    // Validate warehouse location
    if (warehouseItem.item_Id === '' || !Number.isInteger(parseInt(warehouseItem.item_Id))) {
        displayWarehouseItemErrorMessage('Please provide a valid item ID ( Not empty and a number ).',2);
        return;
    }
    if (warehouseItem.quantity === '' || parseInt(warehouseItem.quantity) <= -0 || parseInt(quantity) > 1000 ) {
        displayWarehouseItemErrorMessage('Please provide a valid warehouse item quantity ( Not empty and a positive number less than 1000 ).',2);
        return;
    }

    // Check if allWarehouses and allItems have corresponding Ids, if not don't do post request
    let foundWarehouse = false;
    allWarehouses.forEach( w=> {
        if(w.warehouse_Id == warehouseItem.warehouse_Id){
            foundWarehouse = true;
        }
    });
    let foundItem = false;
    allItems.forEach( i=> {
        if(i.item_Id == warehouseItem.item_Id){
            foundItem = true;
        }
    });
    if(!foundWarehouse) {
        displayWarehouseItemErrorMessage('Cannot find warehouse', 2);
        return;
    }
    if(!foundItem) {
        displayWarehouseItemErrorMessage('Cannot find item', 2);
        return;
    }
    fetch(WIURL + '/warehouseItem', {
        method : 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(warehouseItem)
    })
    .then((data) => {
        // this will handle all 100, 200, and 300 status code responses
        
        // we still need to serialize the response into JSON
        return data.json();
    })
    .then((warehouseItemJson) => {          // handling the promise returned by data.json (*** this is where we update the table ***)
        
        // adding the updated item to our table
        updateWarehouseItemInTable(warehouseItemJson);
        
        // reset the forms
        document.getElementById('update-warehouse-item-form').reset();
        document.getElementById('new-warehouse-item-form').style.display = 'block';
        document.getElementById('update-warehouse-item-form').style.display = 'none';
        document.getElementById('update-warehouse-item-error-message').style.display = 'none';

    })
    .catch((error) => {
        // this will handle all 400 and 500 status code responses
        console.error(error);
        console.error(error.stack);
    })  
});
document.getElementById('delete-warehouse-item-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them
    let warehouseItemId = document.getElementById('delete-warehouse-item-id').value;
    let wId = document.getElementById('delete-warehouse-item-w-id').value;		
    let iId = document.getElementById('delete-warehouse-item-i-id').value;	
    let quantity = document.getElementById('delete-warehouse-item-quantity').value;	

    // creating the item object that needs to be deleted
    let item = {
        warehouse_Item_Id : warehouseItemId,
        warehouse_Id : wId,
        item_Id : iId,
        quantity : quantity
    };

    // sending delete request
    fetch(WIURL + '/warehouseItem', {
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(item)
    })
    .then((data) => {

        // delete request returns no-content so there's no need to deserialize the response and wait for that promie
        // just need to check that the response we got back is 204 - No Content and we can delete it on the front end
        if(data.status === 204) {
            // remove item from table
            removeWarehouseItemFromTable(item);

            // resetting all forms
            resetAllWarehouseItemForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});
function updateWarehouseInTable(warehouse) {
    document.getElementById('warehouseTR' + warehouse.warehouse_Id).innerHTML = `
    <td>${warehouse.warehouse_Id}</td>
    <td>${warehouse.warehouse_Name}</td>
    <td>${warehouse.warehouse_Location}</td>
    <td><button class="btn btn-primary" id="edit-warehouse-button" onclick="activateWarehouseEditForm(${warehouse.warehouse_Id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-warehouse-button" onclick="activateWarehouseDeleteForm(${warehouse.warehouse_Id})">Delete</button></td>
    `;
    // Make sure that the allWarehouses array gets updated as well
    // since that is what our EditBtn pulls from to populate text fields.
    // Otherwise, previous fields get left behind and makes it feel buggy.
    for(let w of allWarehouses) {
        if(w.warehouse_Id == warehouse.warehouse_Id) {
            w.warehouse_Name = warehouse.warehouse_Name;
            w.warehouse_Location = warehouse.warehouse_Location;
        }
    }
}
function updateItemInTable(item) {
    console.log(item.item_Id);
    document.getElementById('itemTR' + item.item_Id).innerHTML = `
    <td>${item.item_Id}</td>
    <td>${item.item_Name}</td>
    <td>${item.item_Description}</td>
    <td>${item.unit_Price}</td>
    <td><button class="btn btn-primary" id="edit-item-Button" onclick="activateItemEditForm(${item.item_Id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-item-Button" onclick="activateItemDeleteForm(${item.item_Id})">Delete</button></td>
    `;
    // Make sure that the allitems array gets updated as well
    // since that is what our EditBtn pulls from to populate text fields.
    // Otherwise, previous fields get left behind and makes it feel buggy.
    for(let i of allItems) {
        if(i.item_Id == item.item_Id) {
            console.log("found match");
            i.item_Name = item.item_Name;
            i.item_Description = item.item_Description;
            i.unit_Price = item.unit_Price;
        }
    }
}
function updateWarehouseItemInTable(warehouseItem) {
    document.getElementById('warehouseItemTR' + warehouseItem.warehouse_Item_Id).innerHTML = `
    <td>${warehouseItem.warehouse_Item_Id}</td>
    <td>${warehouseItem.warehouse_Id}</td>
    <td>${warehouseItem.item_Id}</td>
    <td>${warehouseItem.quantity}</td>
    <td><button class="btn btn-primary" id="edit-item-Button" onclick="activateWarehouseItemEditForm(${warehouseItem.warehouse_Item_Id})">Edit</button></td>
    <td><button class="btn btn-primary" id="delete-item-Button" onclick="activateWarehouseItemDeleteForm(${warehouseItem.warehouse_Item_Id})">Delete</button></td>
    `;
    // Make sure that the allitems array gets updated as well
    // since that is what our EditBtn pulls from to populate text fields.
    // Otherwise, previous fields get left behind and makes it feel buggy.
    for(let wi of allWarehouseItems) {
        if(wi.item_Id == warehouseItem.item_Id) {
            console.log("found match");
            wi.item_Name = warehouseItem.item_Name;
            wi.item_Description = warehouseItem.item_Description;
            wi.unit_Price = warehouseItem.unit_Price;
        }
    }
}
function removeWarehouseFromTable(warehouse) {

    // removing the <tr> from the table when a warehouse gets deleted
    const element = document.getElementById('warehouseTR' + warehouse.warehouse_Id);
    element.remove();
}
function removeItemFromTable(item) {

    // removing the <tr> from the table when a item gets deleted
    const element = document.getElementById('itemTR' + item.item_Id);
    element.remove();
}
function removeWarehouseItemFromTable(warehouseItem) {
    // removing the <tr> from the table when a item gets deleted
    const element = document.getElementById('warehouseItemTR' + warehouseItem.warehouse_Item_Id);
    element.remove();
}
function displayWarehouseErrorMessage(message, option) {
    if(option == 1) {
        let errorElement = document.getElementById('new-warehouse-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    else if(option == 2) {
        let errorElement = document.getElementById('update-warehouse-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}
function displayItemErrorMessage(message, option) {
    if(option == 1) {
        let errorElement = document.getElementById('new-item-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    else if(option == 2) {
        let errorElement = document.getElementById('update-item-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}
function displayWarehouseItemErrorMessage(message, option) {
    if(option == 1) {
        let errorElement = document.getElementById('new-warehouse-item-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    else if(option == 2) {
        let errorElement = document.getElementById('update-warehouse-item-error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}