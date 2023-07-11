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
    `<button class="btn btn-primary" id="edit-button" onclick="activateEditForm(${newWarehouse.id})">Edit</button>`;

    deleteBtn.innerHTML = 
    `<button class="btn btn-primary" id="delete-button" onclick="activateDeleteForm(${newWarehouse.id})">Delete</button>`;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(location);
    tr.appendChild(editBtn);
    tr.appendChild(deleteBtn);

    document.getElementById('warehouse-tbody').appendChild(tr);

    allWarehouses.push(newWarehouse);

}