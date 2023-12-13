
reademployees();

async function reademployees() {
    await fetch(`http://localhost:3000/api/users/?page=${currentPage}&limit=${itemsPerPage}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            render(data);

            document.getElementById(`page${currentPage}`).style.boxShadow = '0px 4px 10px 1px rgb(0 0 0 / 19%)';
        });
}

function render(data) {
    let output = '';
    if (data.length === 0) {
        output = `<h2>No employee found!</h2>`;
    }

    let employees = data.data; // Assuming data is an array

    var pageCount = Math.ceil(employees.length / itemsPerPage);
    pagination(pageCount);

    const jStart = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(employees.length - (currentPage - 1) * itemsPerPage, itemsPerPage);

    for (var i = 0, j = jStart; i < end && j <= employees.length; i++, j++) {
        const emp = employees[i];
        const dropdownId = `dropdownDetails${i}`;
        const dropdownMenu = `dropMenu${i}`;

        let slNo = `${j}`;
        slNo = slNo.padStart(2, "0");
        const capitalizedFirstName = emp.firstName.charAt(0).toUpperCase() + emp.firstName.slice(1).toLowerCase();
        const capitalizedLastName = emp.lastName.charAt(0).toUpperCase() + emp.lastName.slice(1).toLowerCase();

        output += `
            <tr class="tablerow">
                <td>#${slNo}</td>
                <td><span><img class="userpic" src="${emp.avatar}" alt="user"/>${emp.salutation
                    }. ${capitalizedFirstName} ${capitalizedLastName}</span></td>
                <td>${emp.email}</td>
                <td>${emp.phone}</td>
                <td>${emp.gender}</td>
                <td>${emp.dob}</td>
                <td>${emp.country}</td>
                
                <td class="dropdown">
                    <div>
                        <button type="button" data-bs-toggle="dropdown" class="disnone" id="${dropdownMenu}"
                            aria-expanded="false" 
                            onclick="openBtn('${dropdownId}',event)">
                            <span class="material-symbols-outlined">
                                more_horiz
                            </span>
                        </button>
                        <div class="employeebtn" id="${dropdownId}" >
                            <ul>
                                <li><a class="dropdown-item" href="javascript:void(0)" onclick="viewEmployee('${emp._id}')">
                                        <span class="material-symbols-outlined">visibility</span>View Details</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0)" onclick="editEmployeePopup('${emp._id}')">
                                        <span class="material-symbols-outlined">edit</span>Edit</a></li>
                                <li><a class="dropdown-item" onclick="deleteEmployee('${emp._id}')">
                                        <span class="material-symbols-outlined">delete</span>Delete</a></li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    document.getElementById("tablebody").innerHTML = output;
}


