const url = "http://127.0.0.1:3000"

const LOGIN_TRY_ROUTE = "/login/login-try"
const GET_ALL_TASKS_ROUTE = "/tasks-list/GET_ALL_TASKS"
const NEW_TASK_ADDED_ROUTE = "/tasks-list/NEW_TASK_ADDED"
const TASK_DELETED_ROUTE = "/tasks-list/TASK_DELETED"
const TASK_UPDATED_ROUTE = "/tasks-list/TASK_UPDATED"
const TASKS_PAGE_ROUTE = "/tasks-list"
const SIGN_UP_ROUTE = "/sign-up"


document.getElementById("login-button").onclick = login
document.getElementById("change-page-button").onclick = change_page  // assigning new window location route makes alone a get request


function change_page()
{
    window.location.replace(SIGN_UP_ROUTE)  // assigning new window location route}
    /*
    options = {
        method: "GET"
    }
    fetch(SIGN_UP_ROUTE, options
        ).then(response => {window.location.replace(SIGN_UP_ROUTE)}   // assigning new window location route}
        ).catch(err => alert("failed: " + err))
    */
}

function login()
{
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value

    localStorage.setItem("username", username)

    // creating an HTTP POST request using JSON
    // A login try
    let data = {username: username, password: password}  
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'  // when sending in JSON format we need to include this content type
        }
    }
    fetch(LOGIN_TRY_ROUTE, options
         ).then(response => {
            if (response.ok)
            {
                window.location.replace(TASKS_PAGE_ROUTE)  // assigning new window location route
                /*
                options = {
                    method: "GET"
                }
                fetch(TASKS_PAGE_ROUTE, options
                    ).then(response => {
                        alert("supposed to change pagee!!")
                        window.location.replace(TASKS_PAGE_ROUTE)}   // assigning new window location route}
                    ).catch(err => alert("failed: " + err))
                */
            }
            else
            {
                throw "NO Such User.\nUsername or password might be incorrect"
            }

         }).catch(function(error){
            alert("failed: " + error)
        })
}

