let input = document.querySelector(".input-section input");
let button = document.querySelector(".input-section button");
let toolTip = document.querySelector("form .tool-tip");
let tasklist = [];
let UnOrderList = document.querySelector(".list-task ul");
let infoItem = {};
const tasksEndpoint = "tasks";
// to add tasks from local storage to list in first run
if (returnDataFromLocalStorage() != null) {
  tasklist = returnDataFromLocalStorage();
  showTasksToScreen();
}
button.addEventListener("click", (e) => addTask(e));
input.addEventListener("click", (e) => {
  toolTip.classList.remove("show");
});

// add task
function addTask(e) {
  e.preventDefault();
  if (input.value == "") {
    toolTip.classList.add("show");
    return;
  }
  infoItem = {
    isDone: false,
    value: input.value,
  };
  tasklist.push(infoItem);
  addTolocaleStorage(tasklist);
  input.value = "";
  showTasksToScreen();
  input.focus();
}
function createListItem(value, index, isDone) {
  let newListItem = document.createElement("li");
  newListItem.onclick = function () {
    check(index);
  };
  newListItem.innerHTML = `
               <div class="check-icon check-icon-${index} ${
    isDone ? "done" : ""
  }">
                <i onclick="check(${index} )" class="task ri-checkbox-blank-circle-line"></i>
                <i onclick="check(${index} )" class="done-task ri-checkbox-circle-fill"></i>
              </div>
              <p>${value}</p>
              <i onclick="deleteTask(${index})" class="delete ri-delete-bin-6-line"></i>
            `;
  return newListItem;
}
// show tasks
function showTasksToScreen() {
  let item = "";
  UnOrderList.innerHTML = "";
  tasklist.forEach((element, index) => {
    item = createListItem(element.value, index, element.isDone);
    UnOrderList.appendChild(item);
  });
}

// check task
function check(index) {
  document.querySelector(`.check-icon-${index}`).classList.toggle("done");
  tasklist[index].isDone = !tasklist[index].isDone;
  addTolocaleStorage(tasklist);
}

// delete

function deleteTask(index) {
  tasklist.splice(index, 1);
  addTolocaleStorage(tasklist);
  showTasksToScreen();
}

function addTolocaleStorage(value) {
  localStorage.setItem(tasksEndpoint, JSON.stringify(value));
}

function returnDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem(tasksEndpoint));
}
