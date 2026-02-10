const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middle-ware
app.use(cors())
app.use(express.json())

// ROUTES //

// create a todo
app.post('/todos', async(req,res) => {
    try {
        const { description } = req.body
        const newtodo = await pool.query(
            "insert into todo (description) values ($1) RETURNING * ", // RETURNING * means return data after inserting, updating or deleting
            [description]
        )

        res.json(newtodo.rows[0]) // response recevied back
    } catch (e) {
        console.error("error", e.message)
    }
})

// get all todo
app.get('/todos', async(req,res) => {
    try {
        const getall = await pool.query("Select * from todo");
        res.json(getall.rows)
    } catch (e) {
        console.error("error", e.message)
    }
})

// get by id
app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params
        const select = await pool.query("select * from todo where todo_id = $1", [id])

        res.json(select.rows)
    } catch (e) {
        console.error("error", e.message)
    }
})

// update a todo
app.put("/todos/:id", async(req,res) => { // s typo
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updated = await pool.query("update todo set description = $1 where todo_id = $2", [description,id])
        console.log("done")
        res.json("Task updated")
    } catch (e) {
        console.log("not done")
        console.error("error", e.message)
    }
})

// delete a todo
app.delete("/todos/:id", async(req,res) => { // s typo
    try {
        const { id } = req.params
        const deleteTodo = pool.query("delete from todo where todo_id = $1 ",[id]) // id typo

        res.json("todo was deleted")
    } catch (e) {
        console.error("error", e.message)
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});
