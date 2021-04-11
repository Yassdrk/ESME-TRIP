const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./db');
const bcrypt = require('bcrypt');

function initialize (passport){
const autheticateUser = (email, password, done) => {

    pool.query(
        'SELECT * FROM public.utilisateurs WHERE email = $1', [email], (err, results)=>{
            if (err){
                throw err;
            }

            console.log(results.rows);

            if (results.rows.length > 0){

                const user = results.rows[0];
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err){
                        throw err;
                    }

                    if(isMatch){
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password is not correct"});
                    }
                });
            } else {
                return done(null, false, {message: "Lemail nest pas enregistree"});
            }
        }
    )
}
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            autheticateUser
        )
    );

    passport.serializeuser((user, done)=> done(null, user.id));
    passport.deserializeUser((id, done)=>{
        pool.query(
            'SELECT * FROM public.utilisateurs WHERE id_user = $1', [id],(err, results)=>{
                if(err){
                    throw err
                }
                return done(null, results.rows[0]);
            });
    });
}
