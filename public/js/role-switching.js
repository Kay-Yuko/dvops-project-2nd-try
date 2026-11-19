var currentRole = {
    id: 1,
    name: "User"
};

function switchRole() {
    if (currentRole.id === 1) {
        currentRole.id = 2;
        currentRole.name = "Admin";
    } else {
        currentRole.id = 1;
        currentRole.name = "User";
    }

    console.log("Current role:", currentRole);

    updateRoleUI();
}

function updateRoleUI() {
    var addButton = document.querySelector(".addbtn");
    var editButton = document.getElementById("editButton");
    var deleteButton = document.getElementById("deleteAnimalButton");

    if (currentRole.id === 1) {
        if (addButton) addButton.style.display = "none";
        if (editButton) editButton.style.display = "none";
        if (deleteButton) deleteButton.style.display = "none";
    } else {
        if (addButton) addButton.style.display = "block";
        if (editButton) editButton.style.display = "block";
        if (deleteButton) deleteButton.style.display = "block";
    }
}