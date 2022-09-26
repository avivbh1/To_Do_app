
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


function validate_cookie(req, res, conn)
{
   const {cookies} = req
   if ("sid" in cookies) 
   {
      let sid = cookies.sid
      let sql = "SELECT * FROM users WHERE sid='" + sid +"'"
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

module.exports = {
    get_current_time: get_current_time,
    set_cookie_by_username: set_cookie_by_username,
    nullify_cookie: nullify_cookie,
    validate_cookie: validate_cookie
}