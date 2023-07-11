const URL = 'http://localhost:8080/warehouses';
let allWarehouses = [];

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
    xhr.open('GET', URL);

    xhr.send();
});

document.getElementById('new-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let inputData = new FormData(document.getElementById('new-warehouse-form'));

    let newWarehouse = {
        warehouse_Name : inputData.get('new-warehouse-name'),
        warehouse_Location : inputData.get('new-warehouse-location')
    }
    console.log(newWarehouse.warehouse_name + " " + newWarehouse.warehouse_location);
    doPostRequest(newWarehouse);
});

async function doPostRequest(newWarehouse) {
    let returnData = await fetch(URL + '/warehouse', {
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
}

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
    `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newWarehouse.warehouse_Id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newWarehouse.warehouse_Id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    tr.setAttribute('id', 'TR' + newWarehouse.warehouse_Id);
    
    document.getElementById('warehouse-tbody').appendChild(tr);

    allWarehouses.push(newWarehouse);

}


document.getElementById('delete-cancel-button').addEventListener('click', (event) => {
    event.preventDefault();
    resetAllForms();
});

function resetAllForms() {

    // clears data from all forms
    document.getElementById('new-warehouse-form').reset();
    //document.getElementById('update-warehouse-form').reset();
    document.getElementById('delete-warehouse-form').reset();

    // dispalys only the new-movie-form
    document.getElementById('new-warehouse-form').style.display = 'block';
    //document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'none'; 
}

function activateDeleteForm(w_Id) {
    // find the movie and its <tr> that needs to be edited
    for(let w of allWarehouses) {
        if(w.warehouse_Id === w_Id) {
            document.getElementById('delete-warehouse-id').value = w.warehouse_Id;
            document.getElementById('delete-warehouse-name').value = w.warehouse_Name;
            document.getElementById('delete-warehouse-location').value = w.warehouse_Location;
        }
    }

    // showing only the edit form
    document.getElementById('new-warehouse-form').style.display = 'none';
    //document.getElementById('update-warehouse-form').style.display = 'none';
    document.getElementById('delete-warehouse-form').style.display = 'block';   // block is the default for showing a tag
    
}

document.getElementById('delete-warehouse-form').addEventListener('submit', (event) => {
    event.preventDefault();		// prevent default form actions from occuring


    // get the data from the form since all the fields are disabled and FormData won't capture them
    let warehouseId = document.getElementById('delete-warehouse-id').value;
    let warehouseName = document.getElementById('delete-warehouse-name').value;		
    let warehouseLocation = document.getElementById('delete-warehouse-location').value;	

    // creating the movie object that needs to be deleted
    let warehouse = {
        warehouse_Id : warehouseId,
        warehouse_Name : warehouseName,
        warehouse_Location : warehouseLocation,
    };

    // sending delete request
    fetch(URL + '/warehouse', {
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
            // remove movie from table
            removeWarehouseFromTable(warehouse);

            // resetting all forms
            resetAllForms();
        }
    })
    .catch((error) => {
        console.error(error);   
    })

});

function removeWarehouseFromTable(warehouse) {

    // removing the <tr> from the table when a movie gets deleted
    const element = document.getElementById('TR' + warehouse.warehouse_Id);
    element.remove();
}