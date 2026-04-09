let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = -1;

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    displayUsers();
    document.getElementById("userTable").style.display = "none";
});

function displayUsers(filtered = null) {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";
    let list = filtered || users;
    
    list.forEach((user, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.course}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    document.getElementById("totalRecords").textContent = users.length;
    localStorage.setItem("users", JSON.stringify(users));
}

function addUser() {
    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!id || !name || !email || !course) {
        alert("Please fill all fields!");
        return;
    }

    if (editIndex === -1) {
        users.push({ id, name, email, course });
    } else {
        users[editIndex] = { id, name, email, course };
        editIndex = -1;
    }

    clearFields();
    displayUsers();
}

function editUser(index) {
    document.getElementById("studentId").value = users[index].id;
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    document.getElementById("course").value = users[index].course;
    editIndex = index;
}

function deleteUser(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        users.splice(index, 1);
        displayUsers();
    }
}

function deleteAll() {
    if (users.length === 0) return alert("No students to delete!");
    if (confirm("Are you sure you want to delete ALL students?")) {
        users = [];
        displayUsers();
    }
}

function clearFields() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("course").value = "";
}

function searchStudent() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = users.filter(u => 
        u.id.toLowerCase().includes(query) ||
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
    );
    displayUsers(filtered);
}

function toggleTable() {
    const table = document.getElementById("userTable");
    table.style.display = (table.style.display === "none") ? "table" : "none";
}
