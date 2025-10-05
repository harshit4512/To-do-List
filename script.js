document.addEventListener('DOMContentLoaded',()=>{

const todoinput = document.getElementById('todo-input')
const addtaskbtn = document.getElementById('add-task-btn')
const todolist = document.getElementById('todo-list')

let tasks= JSON.parse(localStorage.getItem('tasks')) || [];


tasks.forEach((task) => rendertask(task));

addtaskbtn.addEventListener('click',() => {
    const tasktext = todoinput.value.trim()
    if(tasktext==="") return;
    if (tasks.some(t => t.text.toLowerCase() === tasktext.toLowerCase())) {
           todoinput.value = "";
           return;
    } 

    const newtask = {
        id:Date.now(),
        text: tasktext,
        completed:false
    }

    tasks.push(newtask)
    savetasks();
    rendertask(newtask)
    todoinput.value = "";
    console.log(tasks);
    
// save tasks() -> correct place 
})

// savetasks()->wrongplace

function rendertask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id',task.id)
    li.className = "flex justify-between items-center bg-[#333333] text-white px-4 py-3 mb-2 rounded-lg shadow";

    if(task.completed){
        li.classList.add("completed")
    }

    li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn  bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">delete</button>
    `;

    li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle("line-through");
        li.classList.toggle("opacity-60");
        li.classList.toggle('completed')
        savetasks()
    });

    li.querySelector('button').addEventListener('click',(e) => {
        e.stopPropagation() // prevnt toggle from firing
        tasks = tasks.filter(t => t.id !== task.id)
        li.remove()
        savetasks();
    })
    todolist.appendChild(li)
}

function savetasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

})