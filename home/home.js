function addTodo() {
  var todoInput = document.getElementById("todoInput");

  var userObj = JSON.parse(localStorage.getItem("userLogin"));

  var newDate = new Date();
  var hours = newDate.getHours();
  var zone = "am";

  if (hours >= 12) {
    hours = hours - 12;
    zone = "pm";
  }

  var todoObj = {
    value: todoInput.value,
    email: userObj.email,
    date: `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`,
    time: `${hours}:${newDate.getMinutes()}${zone}`,
  };

  var todoData = localStorage.getItem("todos");

  if (todoObj.value == "") {
    return;
  }

  if (!todoData) {
    var arr = [todoObj];
    localStorage.setItem("todos", JSON.stringify(arr));
  } else {
    var todoArr = JSON.parse(localStorage.getItem("todos"));

    // todoArr.push(todoObj); // To add item on last index
    todoArr.unshift(todoObj); // To add item on 0 index
    localStorage.setItem("todos", JSON.stringify(todoArr));
  }

  todoInput.value = "";

  renderUI();
}

function renderUI() {
  var todoArr = JSON.parse(localStorage.getItem("todos"));

  var parent = document.getElementById("parent");
  parent.innerHTML = "";

  if (!todoArr) {
    return;
  }

  for (var i = 0; i < todoArr.length; i++) {
    parent.innerHTML += `<li>
          <h4>${todoArr[i].value}</h4>
          <p>${todoArr[i].email}</p>
          <p>(${todoArr[i].date}) ${todoArr[i].time}</p>
          <div class="btns">
            <button class="edit" onclick="editVal(this,${i})">Edit</button>
            <button class="delete" onclick="deleteval(${i})">Delete</button>
          </div>
        </li>`;
  }
}

function deleteval(index) {
  var todoArr = JSON.parse(localStorage.getItem("todos"));

  todoArr.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoArr));

  renderUI();
}

function editVal(btn, index) {
  var liElement = btn.parentElement.parentElement;
  var h4 = liElement.querySelector("h4");

  var todoArr = JSON.parse(localStorage.getItem("todos"));
  var userLogin = JSON.parse(localStorage.getItem("userLogin"));
  var oldObj = todoArr[index];

  if (oldObj.email == userLogin.email) {
    if (btn.innerHTML == "Done") {
      var newDate = new Date();
      var hours = newDate.getHours();
      var zone = "am";

      if (hours > 12) {
        hours = hours - 12;
        zone = "pm";
      }

      var updatedObj = {
        value: liElement.firstElementChild.value,
        email: oldObj.email,
        date: `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`,
        time: `${hours}:${newDate.getMinutes()}${zone}`,
      };

      todoArr[index] = updatedObj;
      localStorage.setItem("todos", JSON.stringify(todoArr));

      // create newh4
      var newh4 = document.createElement("h4");
      newh4.innerHTML = liElement.firstElementChild.value;

      renderUI();
    } else {
      // create Input Field
      var inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = h4.innerHTML;
      inputField.setAttribute("class", "inputField");

      liElement.replaceChild(inputField, h4);
      btn.innerHTML = "Done";
    }

    
  } else {

    return;
  }
}

function clearAllTodos() {
  var todoArr = JSON.parse(localStorage.getItem("todos"));

  localStorage.removeItem("todos");

  renderUI();
}
