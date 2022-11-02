const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const pg = require('pg');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '4504610Cba',
      database : 'smartbrain'
    }
  });

  

const app = express();


// this must be placed after app variable creation
app.use(bodyParser.json());
app.use(cors());


// const database = {
//     users:[
//         {
//             id:'123',
//             name: 'john',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries:'0',
//             joined: new Date()
//         },
//         {
//             id:'124',
//             name: 'sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries:'0',
//             joined: new Date()
//         }
//     ],
//     // login:[
//     //     {
//     //         id:'987',
//     //         hash: '',
//     //         email: 'john@gmail.com'
//     //     }
//     // ]
// }

app.get('/', (req,res) => {res.send(database.users)});

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)});

app.put('/image', (req,res) => {image.handleImage(req,res,db)});

app.listen(3000, () => {
    console.log('Smart Brain server started at 3000!')
})


/*
/ --> res = this is working well
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/



