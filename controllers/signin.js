const handleSignin = (req, res, db, bcrypt) => {
    // Load hash from your password DB.
    // bcrypt.compare("password", '$2a$10$khx8YG8mLdwJOWONWNc15OFnq1W1u38HB9J05tMQQpS7Dzb9/b5fK', function(err, res) {
    // console.log('first guess', res);
    //     // res == true
    // });
    // bcrypt.compare("veggies", '$2a$10$khx8YG8mLdwJOWONWNc15OFnq1W1u38HB9J05tMQQpS7Dzb9/b5fK', function(err, res) {
    //     console.log('second guess', res);

    //     // res = false
    // });
    db.select('email','hash').from('login')
    .where('email','=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
        // console.log(isValid)
        if(isValid){
            return db.select('*').from('users')
             .where('email','=', req.body.email)
             .then(user => {
                // console.log(user);
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('Wrong credentials!')

        }
    })
    
    .catch(err => res.status(400).json('Wrong credentials!'))
}

module.exports = {
    handleSignin: handleSignin
}