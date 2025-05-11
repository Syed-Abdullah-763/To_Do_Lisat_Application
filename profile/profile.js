function getUserData() {
    var userData = JSON.parse(localStorage.getItem("userLogin"))
    
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    firstName.value = userData.firstName
    lastName.value = userData.lastName
    email.value = userData.email
    password.value = userData.password
    
}


function updateUser() {
    var firstName = document.getElementById("firstName")
    var lastName = document.getElementById("lastName")
    var email = document.getElementById("email")
    var password = document.getElementById("password")

    var updatedObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
    }

    var userArr = JSON.parse(localStorage.getItem("users"))
    var index;

    for(var i = 0; i < userArr.length; i++) {
        if (userArr[i].email == email.value) {
            index = i
        }
    }

    userArr[index] = updatedObj;

    localStorage.setItem("users", JSON.stringify(userArr))
}


function logoutHandler() {
    window.location.href = "../index.html"
}