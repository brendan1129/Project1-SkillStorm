const WURL = 'http://localhost:8080/warehouses';
const IURL = 'http://localhost:8080/items';
let allWarehouses = [];
let allItems = [];

/* Generate HTTP GET request with the URL where the database is being hosted.
If the readyState of the request is 4 ( Content Loaded ), then we parse in a JSON object
that represents all current Warehouses in the DB and adds them to the front-end table. */
document.addEventListener('DOMContentLoaded', () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status == 200) {
            let warehouses = JSON.parse(xhr.responseText);
            warehouses.forEach(newWarehouse => {
                addWarehouseToTable(newWarehouse);
            });
        }
    };
    xhr.open('GET', WURL);

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
document.getElementById('warehouse-button').addEventListener('click', (event) => {
    resetAllPages(1);
});
document.getElementById('item-button').addEventListener('click', (event) => {
    resetAllPages(2);
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
        displayItemErrorMessage('Please provide a valid warehouse name ( Not empty and not a number ).',1);
        return;
    }
    // Validate warehouse location
    if (itemDescription === '' || Number.isInteger(parseInt(itemDescription))) {
        displayItemErrorMessage('Please provide a valid warehouse location ( Not empty and not a number ).',1);
        return;
    }
    if (itemPrice === '' || itemPrice.toString().split('.')[1] == 2) {
        displayItemErrorMessage('Please provide a valid warehouse location ( Not empty and not a number ).',1);
        return;
    }
    doItemPostRequest(newItem);
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
    `<button class="btn btn-primary" id="edit-button" onclick="activateWarehouseEditForm(${newWarehouse.warehouse_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateWarehouseDeleteForm(${newWarehouse.warehouse_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newWarehouse.warehouse_Id);

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
    `<button class="btn btn-primary" id="edit-button" onclick="activateItemEditForm(${newItem.item_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateItemDeleteForm(${newItem.item_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newItem.item_Id);

    document.getElementById('item-tbody').appendChild(tr);

    allItems.push(newItem);
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
function resetAllPages(option) {
    if(option == 1) {
        document.getElementById('warehouse-form-view').style.display = 'block';
        document.getElementById('warehouse-table-view').style.display = 'block'
        document.getElementById('item-form-view').style.display = 'none';
        document.getElementById('item-table-view').style.display = 'none'
    }
    if(option == 2) {
        document.getElementById('warehouse-form-view').style.display = 'none';
        document.getElementById('warehouse-table-view').style.display = 'none'
        document.getElementById('item-form-view').style.display = 'block';
        document.getElementById('item-table-view').style.display = 'block'
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
    if (warehouse.warehouse_Location === '' || Number.isInteger(parseInt(warehouse.warehouse_Location))) {
        displayWarehouseErrorMessage('Please provide a valid warehouse location ( Not empty and not a number ).', 2);
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
            resetAllForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});
function updateWarehouseInTable(warehouse) {
    document.getElementById('TR' + warehouse.warehouse_Id).innerHTML = `
    <td>${warehouse.warehouse_Id}</td>
    <td>${warehouse.warehouse_Name}</td>
    <td>${warehouse.warehouse_Location}</td>
    <td><button class="btn btn-primary" id=editButton" onclick="activateEditForm(${warehouse.warehouse_Id})">Edit</button></td>
    <td><button class="btn btn-primary" id=deleteButton" onclick="activateDeleteForm(${warehouse.warehouse_Id})">Delete</button></td>
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
function removeWarehouseFromTable(warehouse) {

    // removing the <tr> from the table when a warehouse gets deleted
    const element = document.getElementById('TR' + warehouse.warehouse_Id);
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