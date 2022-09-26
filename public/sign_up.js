const url = "http://192.168.1.106:3000"

const SIGN_UP_TRY_ROUTE = "/sign-up/sign-up-try"
const GET_ALL_TASKS_ROUTE = "/tasks-list/GET_ALL_TASKS"
const NEW_TASK_ADDED_ROUTE = "/tasks-list/NEW_TASK_ADDED"
const TASK_DELETED_ROUTE = "/tasks-list/TASK_DELETED"
const TASK_UPDATED_ROUTE = "/tasks-list/TASK_UPDATED"
const TASKS_PAGE_ROUTE = "/tasks-list"
const LOGIN_ROUTE = "/login"

document.getElementById("sign-up-button").onclick = sign_up
document.getElementById("change-page-button").onclick = change_page


function change_page()
{
    window.location.replace(LOGIN_ROUTE)  // assigning new window location route
    /*
        options = {
            method: "GET"
        }
        fetch(LOGIN_ROUTE, options
            ).then(response => {window.location.replace(LOGIN_ROUTE)}   // assigning new window location route
            ).catch(err => alert("failed: " + err))
    */
}

function sign_up()
{
    let username = document.getElementById("username-input").value
    let password = document.getElementById("password-input").value
    localStorage.removeItem("username")
    // creating an HTTP request using JSON
    // a sign up try
    let data = {username: username, password: password}  
    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'  // when sending in JSON format we need to include this content type
        }
    }
    fetch(SIGN_UP_TRY_ROUTE, options
        ).then(response => {
            if (response.ok) 
            {
                change_page()
            }
            else
            {
                throw "this username is already taken"
            }
            
        }).catch(function(error){
            alert("failed: " + error)
        })
}

