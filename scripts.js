

let allTasks = [];

let activeButtonStatus = "";

const inputEl = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const ulEl = document.getElementById("ul-el");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const doneBtn = document.getElementById("done-btn");
const clearBtn = document.getElementById("clear-btn");



const buttons = [allBtn , activeBtn , doneBtn];

allBtn.classList.add("active");


myTasksFromLocalStorage =  JSON.parse(localStorage.getItem("myTasks"));

if(myTasksFromLocalStorage)
{
    allTasks = myTasksFromLocalStorage;
    renderTasks(allTasks , "All");
}


addBtn.addEventListener("click" , function()
{
    const val = inputEl.value;

    if(val === "") return;

    inputEl.value = "";

    const task = {
        id : Date.now(),
        text : val,
        completed : false
    }


    allTasks.push(task);

    localStorage.setItem("myTasks" , JSON.stringify(allTasks));

    renderTasks(allTasks ,findActiveButton(buttons));
});

for(let i=0;i<buttons.length;i++)
{
    buttons[i].addEventListener("click" , function()
    {
        for(let j=0;j<buttons.length;j++)
        {
            buttons[j].classList.remove("active");
        }

        buttons[i].classList.add("active");

        renderTasks(allTasks , buttons[i].textContent);
    });
}

clearBtn.addEventListener("click",function()
{
    allTasks = clearTasks(allTasks);
    localStorage.setItem("myTasks" , JSON.stringify(allTasks));

    renderTasks(allTasks , findActiveButton(buttons));
});



ulEl.addEventListener("change", function(event) {
    if (event.target.classList.contains("check-input")) {

        const task = findTasks(allTasks, Number(event.target.id));

        if (task) {
            task.completed = event.target.checked;
            localStorage.setItem("myTasks", JSON.stringify(allTasks));
        }
    }
});


function renderTasks(tasks , status)
{
    let listOfTask = "";

    for(let i=0;i<tasks.length;i++)
    {
        const currStatus = tasks[i].completed ? "Done" : "Active";

        if(status == "All" || status == currStatus)
        {
            listOfTask += `<li class="task"><input class="check-input" type="checkbox" id = ${tasks[i].id}
            ${tasks[i].completed ? "checked" : ""}>
            <span> ${tasks[i].text}</span>
                    </li>`
        }
    }

    ulEl.innerHTML = listOfTask;
}


function clearTasks(tasks)
{
    let listOfActiveTasks = [];

    for(let i=0;i<tasks.length;i++)
    {
        if(!tasks[i].completed)
        {
            listOfActiveTasks.push(tasks[i]);
        }
    }

    return listOfActiveTasks;
}

function findTasks(tasks , id)
{
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id === id) return tasks[i];
    }
}

function findActiveButton(statusButtons)
{
    for(let i=0;i<statusButtons.length;i++)
    {
        if(statusButtons[i].classList.contains("active"))
        {
            return statusButtons[i].textContent;
        }
    }
}