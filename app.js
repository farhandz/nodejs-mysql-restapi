const express = require('express')
const app = express();
const db = require('./config/db')
const User = require('./models/User')



 app.get('/', (req,res)=> res.send('respon node js berhasil'));

 db.authenticate().then(() => console.log('berhasil terkoneksi ke dalam database'))
 app.use(express.urlencoded({extended: true}))

 app.post("/crud",async(req,res)=> {
     try {
        //  dstructruring object
         const {username, email, password}  = req.body
         const newUser = new User({
             username,email,password
         })
         await newUser.save()
         res.json(newUser)
     } catch (err) {
         console.error(err.message)
         res.status(500).send("server error")
     }
 })

 app.get("/crud", async (req,res)=> {
     try {
         const GetallUSer = await User.findAll({})

         res.json(GetallUSer)
     } catch (err) {
         console.error(err.message)
         res.status(500).send('server error')
     }
 })

 app.get("/crud/:id", async(req,res) => {
     try {
         const id = req.params.id
         const getById = await User.findOne({
             where: {id: id}
         })

         res.json(getById)
     } catch (err) {
         console.error(err.message)
         res.status(500).send('server eror')
     }
 })

 app.delete("/crud/:id", async(req,res)=> {
    try {
        const id = req.params.id
        const DeleteUser = await User.destroy({
            where: {id: id}
        })
        await DeleteUser
        res.json("berjasil delete user")
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server eror') 
    }
 })

 app.put("/crud/:id", async (req,res)=> {
    try {
        const { username, email, password } = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username, email, password
        }, {where: {id: id}})
        await updateUser
        res.json("berhasil di update")
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server eror') 
    }
 })
 app.listen(5000, ()=>console.log('port berjaln di 5000'))