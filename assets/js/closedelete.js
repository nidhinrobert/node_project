// page 
function redirect() {
    location.replace("http://127.0.0.1:5500/myproject/java/index.html");
}
// modal background
let modalbg = document.querySelector('.overlay');
function modalBackgroundDisplay() {
    modalbg.style.display = 'block';
}
function modalBackgroundNone() {
    modalbg.style.display = 'none';
}

//  Delete Employee

let deleteEmployeebtn = document.querySelector('#deletebtn');
let deleteModal = document.querySelector('.deletemodal .modal');
let deleteCloseBtn = document.querySelector('#deleteCloseBtn');
let deleteCancelBtn = document.querySelector('#deleteCancelBtn');
function deleteEmployee(employeeId) {
    deleteModal.style.display = 'block';

    const delButton = document.getElementById('deleteButton');
    delButton.addEventListener('click', function (e) {
        e.preventDefault();
        DeleteEmployee(employeeId);
    });
}

//function to Delete Employee
let delSuccessfully = document.getElementById('delSuccessfully');
function DeleteEmployee(employeeId) {

    fetch(`http://localhost:3000/api/users/${employeeId}`, {
        method: 'DELETE'
    });
    closeDeleteEmployee();
    deleteSuccessfully();
    reademployees();
}
function deleteSuccessfully() {
    delSuccessfully.style.display = 'block';
    modalBackgroundDisplay();
}
function closeEmpDeletedModal() {
    delSuccessfully.style.display = 'none';
    modalBackgroundNone();
}

function closeDeleteEmployee() {
    deleteModal.style.display = 'none';
}
