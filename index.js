const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');

const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors())
const database = {
    users: [
        {
            id: '123',
            name: 'era',
            email: 'era@gmail.com',
            password:'4312',
            entries: 0,
            joined: new Date() 
        },
        {
            id: '124',
            name: 'edu',
            email: 'edu@gmail.com',
            password:'0417',
            ertries: 0,
            joined: new Date() 
        }
    ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

// signing 
app.post('/signin', (req, res) =>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        }else {
            res.status(400).json('error has occured')
        }
})

// register
app.post('/register', (req, res) =>{
    const {email, name, password} = req.body;
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password:password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})
app.get('/profile/:id', (req, res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
})

app.post('/image', (req, res)=>{
    const {id} = req.body;
    console.log(id)
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id) {
            found = true;
            user.entries ++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});






