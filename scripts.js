

let tasks = [];


const inputEl = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const ulEl = document.getElementById("ul-el");

myTasksFromLocalStorage =  JSON.parse(localStorage.getItem("myTasks"));

if(myTasksFromLocalStorage)
{
    tasks = myTasksFromLocalStorage;
    renderTasks(tasks);
}


addBtn.addEventListener("click" , function()
{
    const val = inputEl.value;
    inputEl.value = "";
    tasks.push(val);

    localStorage.setItem("myTasks" , JSON.stringify(tasks));

    renderTasks(tasks);
});


function renderTasks(tasks)
{
    let listOfTask = "";

    for(let i=0;i<tasks.length;i++)
    {
        listOfTask += `<li class="task"><input class="check-input" type="checkbox">
        <span> ${tasks[i]}</span>
                </li>`
    }

    ulEl.innerHTML = listOfTask;
}