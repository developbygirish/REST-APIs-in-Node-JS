const express = require('express');
const app = express();
const users = require("./MOCK_DATA.json")
const PORT = 8000
const fs = require('fs');

// Middleware for parse or encoding the data to req.body

app.use(express.urlencoded({extended:false}))


// GET REQUEST FOR JSON DATA
app.get("/api/user", (req, res) => {
    return res.json(users)
})


// GET REQUEST FOR HTML DOC
app.get("/user", (req, res) => {
    const html = `
<ul>
${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
</ul>
`
    return res.send(html)
})


// Dynamic Routing to get singal User

app.get("/api/user/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    return res.send(`${user.first_name} ${user.last_name}`)
})

// Adding new user using POST HTTP REQUEST

app.post("/api/user", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ msg: "Added SuccessFully!!" })
    })
})


// Updating the existing user

app.patch("/api/user/:id", (req,res)=>{
    const body=req.body;
    const id = req.params.id;
    const updated=({...body, id:id})
    users[id-1]=updated;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ msg: "Updated SuccessFully!!" })
    })
})

// deleting the existing user

app.delete("/api/user/:id", (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id != id)
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
        return res.json({ msg: "Deleted SuccessFully!!" })
    })
    
})


app.listen(PORT, () => {
    `app is listening on ${PORT}`
})