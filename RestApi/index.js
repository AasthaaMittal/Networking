import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.all('/', (req, res) => {
    // console.log({req, res});
    res.send("I'm up! ");
    // res.json(todos);
})

const PORT = 5111;
app.listen(PORT, () => {
    console.log("Server running at port : ", PORT)
})
const todos  = [{
        id: "1",
        title: "Task 1",
        completed: false,
    },
    {
        id: "2",
        title: "Task 2",
        completed: true,
    }
]
//READ
app.get('/todos', (req, res) => {
    res.json(todos);
})

//CREATE
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({
        message: "New todo added"
    });
})

//UPDATE
app.put('/todos/:id', (req, res) => {
    const newTodo = req.body;
    const todoIndex = todos.findIndex(td => td.id === req.params.id);
    if (todoIndex !== -1) {
        todos[todoIndex] = {
            id: req.params.id,
            ...newTodo
        }
        res.json({
            message: `Todo updated ${req.params.id}`
        });
    }
})

//DELETE
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(td => td.id === req.params.id);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1)
        res.json({
            message: `Todo deleted ${req.params.id}`
        });
    }
})