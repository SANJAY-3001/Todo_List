

let allTasks = [];

const inputEl = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const ulEl = document.getElementById("ul-el");

myTasksFromLocalStorage =  JSON.parse(localStorage.getItem("myTasks"));

if(myTasksFromLocalStorage)
{
    allTasks = myTasksFromLocalStorage;
    renderTasks(tasks);
}


addBtn.addEventListener("click" , function()
{
    const val = inputEl.value;

    if(val === "") return;

    inputEl.value = "";

    const task = 
    {
        id : Date.now(),
        text : val,
        completed : false
    }


    allTasks.push(task);

    localStorage.setItem("myTasks" , JSON.stringify(allTasks));

    renderTasks(allTasks);
});


function renderTasks(tasks)
{
    let listOfTask = "";

    for(let i=0;i<tasks.length;i++)
    {
        listOfTask += `<li class="task"><input class="check-input" type="checkbox" id = "">
        <span> ${tasks[i].text}</span>
                </li>`
    }

    ulEl.innerHTML = listOfTask;
}