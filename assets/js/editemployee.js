// edit employee
let editemployee = document.getElementById("editPopup");
function editEmployeePopup(employeeId) {
    editEmployeeDetails(employeeId);
    editemployee.style.display = 'block';
    modalBackgroundDisplay();
}

let editCloseBtn = document.getElementById('editCloseBtn');
let editCancelBtn = document.getElementById('editCancelBtn');

editCloseBtn.onclick = closeEditEmployee;
editCancelBtn.onclick = closeEditEmployee;

function closeEditEmployee() {
    editemployee.style.display = 'none';
    modalBackgroundNone();
    clearFormEdit();
}
function clearFormEdit() {
    // Reset the form to clear the input fields
    document.getElementById('editEmployeeForm').reset();
    const clearEditImgPreview = document.getElementById('editImgPreview');
    clearEditImgPreview.innerHTML = "";
    console.log('clear edit form');
}

// Edit popup
// function changeDateFormat(v) {
//     const arr = v.split('-');
//     let formattedDate = `${arr[2]}-${arr[1]}-${arr[0]}`;
//     return formattedDate;
// }
// Edit Employee Modal
function editEmployeeDetails(employeeId) {
    fetch(`http://localhost:3000/api/users?id=${employeeId}`)
        .then((response) => response.json())
        .then((employee) => {

            document.getElementById('editsalutation').value = employee.salutation;
            document.getElementById('editfirstname').value = employee.firstName;
            document.getElementById('editlastname').value = employee.lastName;
            document.getElementById('editemail').value = employee.email;
            document.getElementById('editmobile').value = employee.phone;
            document.getElementById('editdatepicker').value = formatDate(employee.dob);
            document.querySelector(`input[name="editgender"][value="${employee.gender}"]`).checked = true;
            document.getElementById('editaddress').value = employee.address;
            document.getElementById('editqualification').value = employee.qualifications;
            document.getElementById('editcountry').value = employee.country;
            document.getElementById('editstate').value = employee.state;
            document.getElementById('editcity').value = employee.city;
            document.getElementById('editzip').value = employee.pincode;
            document.getElementById('editUserName').value = employee.username;
            document.getElementById('editpassword').value = employee.password;
            document.getElementById('editImgPreview').src = `/${employee.avatar}`;
        });


    document.getElementById('savechanges').addEventListener('click', function (event) {
        event.preventDefault();
        console.log('edited');
        saveEditedEmployee(employeeId);
    });
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}

async function saveEditedEmployee(employeeId) {
    console.log(employeeId);
    try {
        if (!editvalidation()) {
            console.log('Validation failed. Cannot save the edited employee.');
            return;
        }

        const salutation = document.getElementById('editsalutation').value;
        const firstName = document.getElementById('editfirstname').value;
        const lastName = document.getElementById('editlastname').value;
        const email = document.getElementById('editemail').value;
        const phone = document.getElementById('editmobile').value;
        const dob = formatDate(document.getElementById('editdatepicker').value);
        const gender = document.querySelector('input[name="editgender"]:checked').value;
        const address = document.getElementById('editaddress').value;
        const qualifications = document.getElementById('editqualification').value;
        const country = document.getElementById('editcountry').value;
        const state = document.getElementById('editstate').value;
        const city = document.getElementById('editcity').value;
        const pincode = document.getElementById('editzip').value;
        const username = document.getElementById('editUserName').value;
        const password = document.getElementById('editpassword').value;
        const file = document.getElementById('editImgUpload').files[0];

        const editEmpData = new FormData()

        // Check if an avatar file is selected
        if (file) {
            editEmpData.append('avatar', file); // Append the avatar file to formData
        }

        editEmpData.append('salutation', salutation);
        editEmpData.append('firstName', firstName);
        editEmpData.append('lastName', lastName);
        editEmpData.append('email', email);
        editEmpData.append('phone', phone);
        editEmpData.append('address', address);
        editEmpData.append('qualifications', qualifications);
        editEmpData.append('country', country);
        editEmpData.append('state', state);
        editEmpData.append('city', city);
        editEmpData.append('pincode', pincode);
        editEmpData.append('password', password);
        editEmpData.append('dob', dob);
        editEmpData.append('gender', gender)
        editEmpData.append('username', username);

        const response = await fetch(`http://localhost:3000/api/users/${employeeId}`, {
            method: 'PUT',
            body: editEmpData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Employee edited:', data);

        closeEditEmployee();
        // showEmployees();
        editedSuccessfullyModal();
    } catch (error) {
        console.error('Error editing employee:', error);
    }
}


function updateImage() {
    const updateUserImage = document.getElementById('editImgUpload');
   

    updateUserImage.addEventListener('change', function (event) {
        const selectedImage = updateUserImage.files[0];

        const reader = new FileReader();

        reader.onload = function (event) {
            const imageUrl = event.target.result;

            const newEmpImage = document.getElementById('editImgPreview');

            newEmpImage.src = imageUrl;
        }
        reader.readAsDataURL(selectedImage);
    });
}
// edit validation
function editvalidation() {
    let salutation = document.getElementById('editsalutation').value;
    let firstName = document.getElementById('editfirstname').value;
    let lastName = document.getElementById('editlastname').value;
    let email = document.getElementById('editemail').value;
    let phone = document.getElementById('editmobile').value;
    let unordereddob = document.getElementById('editdatepicker').value;
    let dob = changeDateFormat(unordereddob);
    function changeDateFormat(v) {
        const arr = v.split('-');
        let ordedereddob = `${arr[2]}-${arr[1]}-${arr[0]}`;
        return ordedereddob;
    }
    // let gender = document.querySelector('input[name="gender"]:checked').value;
    let qualifications = document.getElementById('editqualification').value;
    let address = document.getElementById('editaddress').value;
    let city = document.getElementById('editcity').value;
    let state = document.getElementById('editstate').value;
    let country = document.getElementById('editcountry').value;
    let pincode = document.getElementById('editzip').value;
    let username = document.getElementById('editUserName').value;
    let password = document.getElementById('editpassword').value;
    let valError = true;

    // salutation 
    let salutationRegx = (/^[A-Za-z]/);
    let valSum = 0;
    if (salutationRegx.test(salutation)) {
        document.getElementById('editsalutationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editsalutationValidation').style.display = 'block';
    }
    //  firstName 
    let firstNameRegx = (/^[A-Za-z]/);
    if (firstNameRegx.test(firstName)) {
        document.getElementById('editfirstnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editfirstnameValidation').style.display = 'block';
    }
    // lastName 
    let lastNameRegx = (/^[A-Za-z]/);
    if (lastNameRegx.test(lastName)) {
        document.getElementById('editlastnameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editlastnameValidation').style.display = 'block';
    }
    //    email 
    let emailRegx = (/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/);
    if (emailRegx.test(email)) {
        document.getElementById('editemailValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editemailValidation').style.display = 'block';
    }
    //    phone 
    let phoneRegx = (/^[0-9]{10}$/);
    if (phoneRegx.test(phone)) {
        document.getElementById('editmobileValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editmobileValidation').style.display = 'block';
    }
    //    dob 
    let dobRegx = (/^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/);
    if (dobRegx.test(dob)) {
        document.getElementById('editdatepickerValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editdatepickerValidation').style.display = 'block';
    }
    //     gender 
    //  let genderRegx = (/^[A-Za-z]/);
    //  if (genderRegx.test(gender)) {
    //      document.getElementById('genderValidation').style.display = 'none';
    //       valError = false;
    //  }
    //  else {
    //      document.getElementById('genderValidation').style.display = 'block';
    //  }
    //    address 
    let addressRegx = (/^[A-Za-z0-9]/);
    if (addressRegx.test(address)) {
        document.getElementById('editaddressValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editaddressValidation').style.display = 'block';
    }
    //    qualifications 
    let qualificationsRegx = (/^[A-Za-z]/);
    if (qualificationsRegx.test(qualifications)) {
        document.getElementById('editqualificationValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editqualificationValidation').style.display = 'block';
    }
    //    country 
    let countryRegx = (/^[A-Za-z]/);
    if (countryRegx.test(country)) {
        document.getElementById('editcountryValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editcountryValidation').style.display = 'block';
    }
    //    state 
    let stateRegx = (/^[A-Za-z]/);
    if (stateRegx.test(state)) {
        document.getElementById('editstateValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editstateValidation').style.display = 'block';
    }
    //    city 
    let cityRegx = (/^[A-Za-z]/);
    if (cityRegx.test(city)) {
        document.getElementById('editcityValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editcityValidation').style.display = 'block';
    }
    //    pincode 
    let pincodeRegx = (/^[0-9]/);
    if (pincodeRegx.test(pincode)) {
        document.getElementById('editzipValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editzipValidation').style.display = 'block';
    }
    //    username 
    let usernameRegx = (/^[A-Za-z]/);
    if (usernameRegx.test(username)) {
        document.getElementById('editUserNameValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editUserNameValidation').style.display = 'block';
    }
    //    password 
    let passwordRegx = (/^[A-Za-z0-9]/);
    if (passwordRegx.test(password)) {
        document.getElementById('editpasswordValidation').style.display = 'none';
        valError = false;
        valSum = valSum + 1;
    }
    else {
        document.getElementById('editpasswordValidation').style.display = 'block';
    }

    if (valSum === 14) {
        return true;
    }
}