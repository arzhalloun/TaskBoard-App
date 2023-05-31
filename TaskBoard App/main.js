let form = document.getElementById("form");
let textInput = document.getElementById("textInput");

let dateInput = document.getElementById("dateInput");
dateInput.required = true;



let timeInput = document.getElementById("timeInput")
timeInput.required = true;

let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let clearBtn = document.getElementById("clear-btn");

let selectFilter = document.getElementById("selectFilter");







form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});



// form script

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
  
};





// date 







//localstorage

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    time: timeInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};


//Tasks 

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y} class="task ${x.done ? "task-done" : ""}">
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <span class="small text-secondary">${x.time}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick = "doneTask(this, ${y})" class="fas fa-check"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
    
  });
  
};





// Delete Tasks

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};





// Edit Tasks 

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  formattedDate.value = selectedTask.children[1].innerHTML;
  timeInput.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  formattedDate.value ="";
  timeInput.value = "";
  textarea.value = "";
};




// Done Tasks 


let doneTask = (e, i) => {
    data[i].done = !data[i].done;
    createTasks();
    localStorage.setItem("data", JSON.stringify(data));
  };


  


  //Task Filter 

  selectFilter.addEventListener("change", function() {
    let selectedOption = this.value;
    if (selectedOption === "all") {
      createTasks();
    } else {
      tasks.innerHTML = "";
      data.map((x, y) => {
        if (selectedOption === "completed" && x.done) {
          return (tasks.innerHTML += `
          <div id=${y} class="task ${x.done ? "task-done" : ""}">
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <span class="small text-secondary">${x.time}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick = "doneTask(this, ${y})" class="fas fa-check"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>         `);
        } else if (selectedOption === "incomplete" && !x.done) {
          return (tasks.innerHTML += `
          <div id=${y} class="tasks">
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <span class="small text-secondary">${x.time}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick = "doneTask(this, ${y})" class="fas fa-check"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
          `);
        }
      });
    }

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

  });



// Save to localstorage

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();

})();




// Clear Board from all tasks

clearBtn.addEventListener("click", function() {
    while (tasks.firstChild) {
     tasks.removeChild(tasks.firstChild);
   }

   localStorage.clear("data", JSON.stringify(data));

 });


