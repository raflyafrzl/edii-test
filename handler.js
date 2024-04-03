const client = require("./db_con")
const bcrypt = require("bcrypt")
const salt = 10;

//connect to the db using IIFE
(async function() {
    await client.connect()
  })();


//get detail user or get all user
async function getDataUser(req,res) {

    const {id} = req.params

    try{
    
        let result
        if (id === "all") { 
             result = await client.query("select * from tbl_user");
        }else {
            const query = {
                text: 'SELECT * FROM tbl_user where userid = $1',
                values: [id]
            }
             result = await client.query(query)
        }
        
      
        res.json({
            status:"success",
            data:result.rows
        })
    }catch(err) {
        res.json({
            status:"failed",
            data: err
        })
    }
   
}


//create new user
async function setDataUser(req,res) {

    const {userid, namalengkap, username, password, status} = req.body
    try {

        const hashedPassword = bcrypt.hashSync(password, salt)
    

        const query = {
            text: "INSERT INTO tbl_user(userid,namalengkap,username,password,status) VALUES($1,$2,$3,$4,$5)",
            values: [userid,namalengkap,username,hashedPassword,status]
        }
         await client.query(query)

        res.status(201).send({
            status:"success",
            message: `data with User Id: ${userid} has been created`,
            data: {
                id: userid,
                username,
                namalengkap
            }
        })

    } catch (error) {
    
        res.json({
           name: error.name,
            status:"failed",
            message: error.message,
        })

        
    }

}


//delete data user
async function delDataUser(req,res) {
    const {id} =req.params
    try{

    //check the user first
    const query = {
        text: "SELECT userid from tbl_user where userid = $1",
        values:[id]
    }
    const result = await client.query(query)

    //check if the result is found 

    if (result.rows.length == 0) {
        throw {name: "notfound", message: "no result found"}
    }


    //if there is a result then delete it directly 

    const queryDelete = {
        text: "DELETE FROM tbl_user where userid = $1", 
        values:[id]
    }
    await client.query(queryDelete)


    res.status(200).json({
        status:"success",
        message:"user has been deleted",
        data: id,
    })


    }catch(error) {
        if (error.name ==="notfound") {
            res.status(404).json({
                status:'failed',
                name: error. name,
                message: error.message
            })
        }else {
            res.status(400).json({
                status:'failed',
                name:error.name,
                message: error.message
            })
        }

    }

}

module.exports =  {getDataUser,setDataUser, delDataUser}