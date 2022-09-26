let num_of_tasks = 0
let all_task_divs = []

const url = "http://192.168.1.106:3000"
const GET_ALL_TASKS_ROUTE = "/tasks-list/GET_ALL_TASKS"
const NEW_TASK_ADDED_ROUTE = "/tasks-list/NEW_TASK_ADDED"
const TASK_DELETED_ROUTE = "/tasks-list/TASK_DELETED"
const TASK_UPDATED_ROUTE = "/tasks-list/TASK_UPDATED"


const new_task_btn = document.getElementById("new-task-button").onclick = add_task_clicked
document.getElementById("back-button").onclick = go_home
const task_text_input = document.getElementById("task-text-input")

initialize_list()


function go_home()
{
    window.location.replace("/") // assigning new window location route
    /*
    options = {
        method: "GET"
    }
    fetch("/", options
        ).then(response => {window.location.replace("/")} // assigning new window location route
        ).catch(err => alert("failed: " + err))
    */
}

function initialize_list()
{
    // first we're setting the username title
    // requesting for all the tasks this user has
    options = {
        method: 'GET',
        }

    fetch(GET_ALL_TASKS_ROUTE, options
        ).then(response => response.json()
        ).then(function(res_json) {
            document.getElementById("username-title").innerHTML = res_json.username
            all_tasks = res_json.tasks
            for(let i = 0; i < all_tasks.length; i++)
            {
                console.log(all_tasks[i].task_content)
                show_new_task_on_window(all_tasks[i].task_content)
            }
        }).catch(function(error){
       alert("failed: " + error)
       })
}


function create_new_task(task_content)
{
    let task_number = num_of_tasks
    options = {
        method: 'POST',
        body: JSON.stringify({task_number: task_number, task_content: task_content}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'  // when sending in JSON format we need to include this content type
        }
    }
    fetch(NEW_TASK_ADDED_ROUTE, options
        ).then(function(response){
            console.log(response.headers)
            if (response.ok)
            {
                show_new_task_on_window(task_content)
            }
        }
        ).catch(function(error){
            alert("failed: " + error + ".\n we could'nt add your task")
       })
}

function delete_task(task_number)
{
    options = {
        method: 'PUT',
        body: JSON.stringify({task_number: task_number, task_content: null}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'  // when sending in JSON format we need to include this content type
        }
    }

    fetch(TASK_DELETED_ROUTE, options
        ).then(function(response){
            console.log(response.headers)
            if (response.ok)
            {      
                delete_task_on_window(task_number)
                
            }
        }
        ).catch(function(error){
            alert("failed: " + error + ".\n we could'nt delete your task")
       })
}

function update_task(task_number)
{
    let current_div_task = all_task_divs[task_number]
    let current_task_edit_btn = current_div_task.getElementsByClassName("task-edit-button")[0]
    let current_task_edit_area = current_div_task.getElementsByClassName("task-text-area")[0]

    if (current_task_edit_btn.dataset.is_on_edit == 1)
    {
        current_task_edit_btn.dataset.is_on_edit = 0
        let task_content = current_task_edit_area.value
        console.log(task_content)
        options = {
            method: 'PUT',
            body: JSON.stringify({task_number: task_number, task_content: task_content}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'  // when sending in JSON format we need to include this content type
            }
        }
        fetch(TASK_UPDATED_ROUTE, options
            ).then(function(response){
                console.log(response)
                if (response.ok)
                {
                    close_edit_mode_to_task(current_task_edit_btn, current_task_edit_area)
                }
            }
            ).catch(function(error){
                alert("failed: " + error + ".\n we could'nt edit your task")
        })
    }
    else if(current_task_edit_btn.dataset.is_on_edit == 0)
    {
        current_task_edit_btn.dataset.is_on_edit = 1
        current_div_task.appendChild(current_task_edit_area)
        open_edit_mode_to_task(current_task_edit_btn, current_task_edit_area)
    }
}



function add_task_clicked()
{
    // a callback function for the "add task" button
    let new_task_content = task_text_input.value
    task_text_input.value = null
    if (new_task_content != "")
    {
        create_new_task(new_task_content)
    }
}

function show_new_task_on_window(new_task_content)
{
    let new_task_div = document.createElement("div")  // creating new div element for the whole task elements
    let new_task_content_text_area = document.createElement("textarea") // creating new label element
    let new_task_delete_btn = document.createElement("input")
    let new_task_number_label =document.createElement("label")  // creating new num_of_task label
    let new_task_edit_btn = document.createElement("input")

    new_task_div.setAttribute("id", "div-task-"+num_of_tasks.toString())
    new_task_div.setAttribute("class", "task-div")

    new_task_content_text_area.setAttribute("class","task-text-area") 
    new_task_content_text_area.setAttribute("readonly", true)

    new_task_content_text_area.style.backgroundColor='rgb(155, 154, 154)';
    new_task_content_text_area.setAttribute("rows", "5")
    new_task_content_text_area.setAttribute("cols", "10")

    new_task_delete_btn.setAttribute("type", "image")
    new_task_delete_btn.setAttribute("src", "bin.png")
    new_task_delete_btn.setAttribute("value", num_of_tasks)
    new_task_delete_btn.setAttribute("class", "task-delete-button")
    new_task_delete_btn.setAttribute("style", "margin-top: 0px;")
    new_task_delete_btn.addEventListener("click", function call_delete_function()
    {
        delete_task(this.value)
        num_of_tasks -= 1
    }) 

    new_task_edit_btn.setAttribute("type", "image")
    new_task_edit_btn.setAttribute("src", "hand_writing.jpg")
    new_task_edit_btn.setAttribute("value", num_of_tasks)
    new_task_edit_btn.setAttribute("class", "task-edit-button")
    new_task_edit_btn.setAttribute("data-is_on_edit", 0)
    new_task_edit_btn.setAttribute("style", "margin-top: 0px;")
    new_task_edit_btn.addEventListener("click", function call_edit_function()
    {
        update_task(this.value)
    })

    new_task_number_label.setAttribute("class", "task-number")

    new_task_div.appendChild(new_task_number_label)
    new_task_div.appendChild(new_task_content_text_area)
    new_task_div.appendChild(new_task_delete_btn)
    new_task_div.appendChild(new_task_edit_btn)
    document.getElementById("tasks-main-div").appendChild(new_task_div)


    new_task_content_text_area.innerHTML = new_task_content  // setting the text in the label
    new_task_number_label.innerHTML = "task: " + num_of_tasks      // setting the number of the task in the label

    all_task_divs.push(new_task_div)  // their index in the list is their index in the order of creation of them
    num_of_tasks += 1

}

function delete_task_on_window(task_number) // deleting the task by the given task number
{
    task_number = Number(task_number)

    document.getElementById("div-task-"+task_number).remove()
    // reducing by 1 the task-number of all the tasks after the deleted task
    for (let i = task_number + 1; i < all_task_divs.length; i++)
    {
        currrent_div_task = all_task_divs[i]

        // resetting the value of the delete button to the correct task-number
        let current_task_delete_btn = currrent_div_task.getElementsByClassName("task-delete-button")[0]
        current_task_delete_btn.setAttribute("value", i-1)

        // resetting the value of the edit button to the correct task-number
        let current_task_edit_btn = currrent_div_task.getElementsByClassName("task-edit-button")[0]
        current_task_edit_btn.setAttribute("value", i-1)

        // resetting the value of the task-number-label to the correct task-number
        let currrent_div_task_number_label = currrent_div_task.getElementsByClassName("task-number")[0]
        currrent_div_task_number_label.innerHTML = "task: " + (i - 1)
        currrent_div_task.setAttribute("id", "div-task-"+(i-1))

        // moving all the tasks one step back in the list
        all_task_divs[i-1] = currrent_div_task
    }
    all_task_divs.pop()  
}


function open_edit_mode_to_task(current_task_edit_btn, current_task_edit_area)
{
    current_task_edit_area.removeAttribute("readonly");
    //current_task_edit_btn.removeAttribute('readonly');
    current_task_edit_area.style.backgroundColor='white';

    //edit_task_input.style = "position: absulote;"

    current_task_edit_btn.setAttribute("src", "save.jpg")
}

function close_edit_mode_to_task(current_task_edit_btn, current_task_edit_area)
{
    current_task_edit_area.setAttribute("readonly", true)
    current_task_edit_area.style.backgroundColor='rgb(155, 154, 154)'
    current_task_edit_btn.setAttribute("src", "hand_writing.jpg")
}