const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const mysql = require("mysql")
const utils = require("./utils")

const PORT = 3000

const LOGIN_TRY_ROUTE = "/login/login-try"
const SIGN_UP_TRY_ROUTE = "/sign-up/sign-up-try"
const GET_ALL_TASKS_ROUTE = "/tasks-list/GET_ALL_TASKS"
const NEW_TASK_ADDED_ROUTE = "/tasks-list/NEW_TASK_ADDED"
const TASK_DELETED_ROUTE = "/tasks-list/TASK_DELETED"
const TASK_UPDATED_ROUTE = "/tasks-list/TASK_UPDATED"
const TASKS_PAGE_ROUTE = "/tasks-list"


app.use(express.static(__dirname+'/public'))

app.use(express.json())

app.use(cookieParser())

var conn = mysql.createConnection({
   host: "127.0.0.1",
   user: "root",
   password: "aviv33qwe123",
   database: "tasks_db"
})

conn.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
})

/*
function get_current_time()
{
    let currentdate = new Date(); 
    let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime
}


function set_cookie_by_username(str) {
   var hash = 0,
     i, chr;
   if (str.length === 0) return hash;
   for (i = 0; i < str.length; i++) {
     chr = str.charCodeAt(i);
     hash = ((hash << 5) - hash) + chr;
     hash |= 0; // Convert to 32bit integer
   }
   return hash;
 }


 function nullify_cookie(req, res)
 {
   const {cookies} = req
   if ("sid" in cookies) 
   {
      res.cookie('sid', "", {
         httpOnly: true,
         // secure: true
      })
   }
 }



 function validate_cookie(req, res)
{
   const {cookies} = req
   if ("sid" in cookies) 
   {
      sid = cookies.sid
      sql = "SELECT * FROM users WHERE sid='" + sid +"'"
      conn.query(sql, function(sql_err, sql_result){
         if (sql_err)
         {
            throw sql_err 
         }
         else if ((sql_result && sql_result.length))
         {
            // it will continue the program without sending errors
         }
         else
         {
            res.status(403).send({msg: "not authenticated"})
         }
      })
   }
   else 
   {
      console.log("request got rejected thanks to cookies")
      res.status(403).send({msg: "not authenticated"})
   }
}

*/

app.get("/", function(req, res)
{
   utils.nullify_cookie(req, res)
   res.status(200).sendFile(__dirname+"/public/home.html")
})

app.get("/login", function(req, res){
    utils.nullify_cookie(req, res)
    res.status(200).sendFile(__dirname+"/public/login.html")
})

app.get("/login", function(req, res) {
    res.status.sendFile(__dirname+"/public/login.js")
})

 app.get("/login", function(req,res){
    res.status(200).sendFile(__dirname+"/public/login.css")
 })

 app.get("/sign-up", function(req,res){
    utils.nullify_cookie(req, res)
    res.status(200).sendFile(__dirname+"/public/sign_up.html")
 })

 app.get("/sign-up", function(req,res){
    res.status(200).sendFile(__dirname+"/public/sign_up.js")
 })

 app.get("/sign-up", function(req,res){
    res.status(200).sendFile(__dirname+"/public/sign_up.css")
 })


app.get(TASKS_PAGE_ROUTE, (req, res) => {
   console.log("we did sent the tasks page")
   res.status(200).sendFile(__dirname+"/public/to_do_list.html")
})

app.get(TASKS_PAGE_ROUTE, function(req, res) {
    res.status(200).sendFile(__dirname+"/public/to_do_list.js")
})

 app.get(TASKS_PAGE_ROUTE, function(req,res){
    res.status(200).sendFile(__dirname+"/public/to_do_list.css")
 })

 app.get(TASKS_PAGE_ROUTE, function(req,res){
    res.status(200).sendFile(__dirname+"/public/bin.png")
 })
 
 app.get(TASKS_PAGE_ROUTE, function(req,res){
    res.status(200).sendFile(__dirname+"/public/hand_writing.jpg")
 })

 app.get(TASKS_PAGE_ROUTE, function(req,res){
    res.status(200).sendFile(__dirname+"/public/save.jpg")
 })




 app.post(LOGIN_TRY_ROUTE, function(req, res){
   let sql = "SELECT sid FROM users WHERE username='" + req.body.username + "' AND password='" + req.body.password + "'"
   conn.query(sql, function(select_err, select_result){
         if (select_err)
         {
            throw select_err
         }
         else if(select_result && select_result.length)
         {

            console.log("LOGGER:" ,req.body.username ,"just logged back into our system")
            console.log("login 200")
            console.log(select_result[0]["sid"])
            new_date = new Date("Wed, 27 July 2500 13:30:00")
            console.log(new_date)
            
            res.cookie('sid', select_result[0]["sid"], {
               expires: new_date,
               httpOnly: true,
               path: "/tasks-list"
               // secure: true
            })
            
            res.send()  // sends null
         }
         else
         {
            console.log("login 401")
            res.status(401).send()  // un authorized 401
         }
   })
})



app.post(SIGN_UP_TRY_ROUTE, function(req, res){
   let sql = "SELECT * FROM users WHERE username='" + req.body.username + "'"
   conn.query(sql, function(sql_err, sql_result){
         if (sql_err)
         {
            throw err
         }
         else if((sql_result && sql_result.length) == false)  // means there is no such a username
         {
            // creating new user in our db and sending him his cookie
            //let insert_sql = "INSERT INTO users (username, password, sid) VALUES ('" + req.body.username + "', '"  + req.body.password + "', '" + req.session.id + "')"
            const sid = utils.set_cookie_by_username(req.body.username)  // sessin id known as cookie

            let insert_sql = "INSERT INTO users (username, password, sid) VALUES ('" + req.body.username + "', '"  + req.body.password + "', '" + sid + "')"
            console.log(insert_sql)
            conn.query(insert_sql, function(insert_err, insert_result)
            {
               if (insert_err) throw insert_err
               else
               {
                  console.log("LOGGER:" ,req.body.username ,"just signed up into our system")
                  console.log("signup 200")
                  res.status(200).send()
               }
            })
            
         }
         else
         {
            //throw new Error("username is already taken")
            console.log("sign up 409")
            res.sendStatus(409);  // username allready
         }
   })
})



 app.get(GET_ALL_TASKS_ROUTE, function(req, res){
   utils.validate_cookie(req, res, conn)  // will send 403 message if it wont find the cookie
   console.log("there are the cookies: " + req.cookies.sid)
   sql = "SELECT * FROM all_tasks WHERE user_sid='" + req.cookies.sid + "'"
   conn.query(sql, function(err, result){
      if (err) throw err
      all_tasks = []
      for(let i = 0; i < result.length; i++)
      {
         all_tasks.push({task_content: result[i].task_content})
         console.log(all_tasks[i])
      }
      conn.query("SELECT username FROM users WHERE sid='" + req.cookies.sid + "'", function(user_err, user_res)
      {
         if (user_err) throw err
         console.log(user_res)
         res.json({username: user_res[0]["username"],tasks: all_tasks})  // sending response to the client
         console.log("LOGGER: SENT ALL TASKS")
      })
   })
})

app.put(TASK_DELETED_ROUTE, function(req, res){
   utils.validate_cookie(req, res, conn)  // will send 403 message if it wont find the cookie
   sql = "DELETE FROM all_tasks WHERE task_number=" + req.body.task_number + " AND user_sid='" + req.cookies.sid + "'" 
   console.log(sql)
   conn.query(sql, function(err, result)
   {
      if (err) throw err;      
      sql = "UPDATE all_tasks SET task_number=task_number - 1 WHERE task_number > " + req.body.task_number + " AND user_sid='" + req.cookies.sid + "'" 
      conn.query(sql, function(err, result)
      {
         if (err) throw err;
         console.log("LOGGER: DELETED successfully from data base")
         res.json({})
      })
   })
})

app.put(TASK_UPDATED_ROUTE, function(req, res){
   utils.validate_cookie(req, res, conn)  // will send 403 message if it wont find the cookie
   sql = "UPDATE all_tasks SET task_content='" + req.body.task_content + "' WHERE task_number=" + req.body.task_number + " AND user_sid='" + req.cookies.sid + "'"
   console.log(sql)
   conn.query(sql, function(err, result)
   {
      if (err) throw err;
      console.log("LOGGER: UPDATED successfully from data base")
      res.json({})   
   })
})

app.post(NEW_TASK_ADDED_ROUTE, function(req, res){
   utils.validate_cookie(req, res, conn)  // will send 403 message if it wont find the cookie
   sql = "INSERT INTO all_tasks (task_number, task_content, user_sid) VALUES (" + req.body.task_number + ", '"  + req.body.task_content + "', '" + req.cookies.sid + "')"
   console.log(sql)
   conn.query(sql, function(err, result)
   {
      if (err) throw err;
      console.log("LOGGER: INSERTED into database successfully")
      res.json({})
   })
})



app.listen(PORT, function() { console.log('Server has started on port ' + PORT.toString()  + " | " + utils.get_current_time().toString())})
//app.listen(PORT, function() { console.log('Server has started on port ' + PORT.toString()) })