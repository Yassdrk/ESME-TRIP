const express = require("express");
const jwt = require('jsonwebtoken');

const { restart } = require("nodemon");
const app = express();
const pool = require("./db");
const cors = require('cors')
const cookieParser = require("cookie-parser")
const multer = require("multer")


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/images')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '.jpg')
    }
})
var upload = multer({ storage: storage });

app.use(express.static('public/images'));


app.use(express.json()); // => req.body
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))
app.use(cookieParser())
app.listen(5000, () => {
    console.log("server is listening on port 5000");
});
//ROUTES//

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1><center>Bienvenue sur le serveur de ESME TRIP<br></center></h1>')
  });

  
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });

// Sélectionner tous les utilisateurs

app.get("/users", async(req,res) => {
    try {
        
        const allTodos = await pool.query("SELECT * FROM public.utilisateurs");

        res.json(allTodos.rows);

    } catch (err) {
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
    }
});

// Compteur d'email afin de vérifier si le email est déjà utilisé, ou pas.

app.get("/checkEmail/:email", async(req,res) => {
    try {
        const {email} = req.params;
        const EmailExist = await pool.query("SELECT email FROM public.utilisateurs WHERE email = $1",
        [email]);

        res.json(EmailExist.rows.length);

    } catch (err) {
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
    }
});

// get an user

app.get("/users/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const todo = await pool.query("SELECT * FROM public.utilisateurs WHERE id_user = $1", [id]);

        res.json(todo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
    console.log(req.params);
});

// Créer un utilisateur

app.post("/users", async (req, res) => {
    try{
        const { nom } = req.body;
        const { prenom } = req.body;
        const { email } = req.body;
        const { pass } = req.body;

    

        // Hasher password
        const bcrypt = require('bcrypt')
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(pass, salt)

        const newTodo = await pool.query(
        "INSERT INTO public.utilisateurs (nom, prenom, email, pass) VALUES ($1,$2,$3,$4) RETURNING *",
        [nom,prenom, email, hash]
        );      
            
        //return
        return res.json(newTodo.rows[0]);

        
    } catch (err) {
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
    }
});

// Connexion d'un utilisateur

app.post("/login", async (req, res) => {
    try{
        const { email } = req.body;
        const { pass } = req.body;
    

        const bcrypt = require('bcrypt')
        

        const findUser = await pool.query("SELECT COUNT(email) FROM public.utilisateurs WHERE (email = $1)", [email]);      

       
        if(findUser.rows[0].count == "0"){
            return res.status(404).send({
                message: 'Le compte n\'existe pas.'
            })
        }else{
            const getPass = await pool.query("SELECT pass FROM public.utilisateurs WHERE (email = $1)", [email]);      
            const compare = await bcrypt.compare(''+pass, ''+getPass.rows[0].pass)

            if(compare == true){
                const getUser = await pool.query("SELECT * FROM public.utilisateurs WHERE (email = $1)", [email]);
                const token = jwt.sign({id_user: getUser.rows[0].id_user}, "secret")
                
                
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 // 1 jour
                 
                })
                res.send({
                    message: 'success'
                });
                process.stdout.write("Connexion de l'utilisateur: "+getUser.rows[0].email+"\n");

    
            }else{
                return res.status(404).send({
                    message: 'Le mot de passe est incorrect.'
                })
                
            }
        }
        
      
        
        
    } catch (err) {
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
        
    }
});

// Authentification d'un utilisateur

app.get("/auth", async (req, res) => {
    try{
       const cookie = req.cookies['jwt']

       const claims = jwt.verify(cookie, 'secret')

       if (!claims){
            return res.status(401).send({
                message: 'Non connecté'
            })
       }
       const getUser = await pool.query("SELECT * FROM public.utilisateurs WHERE (id_user = $1)", [claims.id_user]);
       
       res.send(getUser.rows[0])

    } catch (err) {
        return res.status(401).send({
            message:'Accès non autorisé'
        })  
          
        
    }
});

// Est admin ?

app.get("/admin/:email", async(req,res) => {
    try {
        const {email} = req.params;
        const estAdmin = await pool.query("SELECT * FROM public.utilisateurs WHERE email = $1",
        [email]);

        res.json(estAdmin.rows[0].isAdmin);

    } catch (err) {
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
    }
});

// Deconnexion d'un utilisateur

app.post("/logout", async (req, res) => {
    try{
        
        res.cookie('jwt', '', {maxAge:0})
        res.send({
            message:'deconnexion réussie'
        })
        localStorage.removeItem('token')
    } catch (err) {
        console.error(err.message);
    }
});

 

// Modifier le nom d'un utilisateur

app.put("/users/:id", async (req, res) => {
    try{
        const { id } = req.params; // WHERE
        const { nom } = req.body; // SET
        const { prenom } = req.body; // SET

        if(nom !== null && prenom !== null){
            const updateTodo = await pool.query(
                "UPDATE public.utilisateurs SET nom = $1,prenom = $3 WHERE id_user = $2",
                [nom,id,prenom]
            );
        }
        if(nom !== null && prenom == null){
            const updateTodo = await pool.query(
                "UPDATE public.utilisateurs SET nom = $1 WHERE id_user = $2",
                [nom,id]
            );
        }
        if(prenom !== null && nom == null){
            const updateTodo = await pool.query(
                "UPDATE public.utilisateurs SET prenom = $1 WHERE id_user = $2",
                [prenom,id]
            );
        }
        res.json("Utilisateur modifié !");

    } catch (err) {
        console.error(err.message);
    }
});

// Supprimer un utilisateur
app.delete("/delete/users/:id", async (req, res) => {
    try{
        const { id } = req.params; // WHERE
        const deleteUser = await pool.query(
            "DELETE FROM public.utilisateurs WHERE id_user = $1",
            [id]
        );
        
        res.json("Utilisateur supprimé !");

    } catch (err) {
        console.error(err.message);
    }
});
// Supprimer un voyage
app.delete("/delete/voyages/:id", async (req, res) => {
    try{
        const { id } = req.params; // WHERE
        const deleteTrip = await pool.query(
            "DELETE FROM public.voyages WHERE id_voyage = $1",
            [id]
        );
        
        res.json("Voyage supprimé !");

    } catch (err) {
        console.error(err.message);
    }
});


// Voir tous les voyages

app.get("/voyages", async(req,res) => {
    try {
        
        const allVoyages = await pool.query("SELECT * FROM public.voyages");

        res.json(allVoyages.rows);

    } catch (err) {
        console.error(err.message);
    }
});

// Voir un seul voyage

app.get("/voyages/:id", async (req, res) => {
    const {id} = req.params;
    try{


        const voyageUnique = await pool.query("SELECT * FROM public.voyages WHERE id_voyage = $1", [id]);

        res.json(voyageUnique.rows[0]);
    } catch(err){
        console.error(err.message);
    }
    console.log(req.params);
});

// Rechercher des voyages

app.get("/search/", async(req,res) => {
    
    try {
        q = req.query.q;
       
        test = "SELECT * FROM public.voyages WHERE nom_voyage"+" LIKE '%" + q + "'%";
        if(q !== ""){
            const monVoyage = await pool.query("SELECT * FROM public.voyages WHERE UPPER(nom_voyage)"+" LIKE UPPER('%" + q + "%')");
            res.json(monVoyage.rows);
        }else{
            res.json("");
        }
        


    } catch (err) {
        
        return res.status(401).send({
            message:'Une erreur est survenue'
        })
        
    }
});

// Créer un voyage

app.post("/voyages", async (req, res) => {
    try{
        const { nom_voyage } = req.body;
        const { description } = req.body;
        const { description_detaillee } = req.body;
        const { photos } = req.body

        const newVoyage = await pool.query("INSERT INTO public.voyages (nom_voyage, description, description_detaillee, photos) VALUES ($1,$2,$3,$4) RETURNING *",
        [nom_voyage, description, description_detaillee, photos]
        );      
            
        //return
        return res.json(newVoyage.rows[0]);

        
    } catch (err) {
        console.error(err.message);
    }
});
// Créer un séjour

app.post("/sejours", async (req, res) => {
    try{
        const { date1 } = req.body;
        const { date2 } = req.body;
        const { id_voyage } = req.body;
        const { price } = req.body;



        const newSejours = await pool.query(
        "INSERT INTO public.sejours (id_voyage,date1,date2, price) VALUES ($1,$2,$3,$4) RETURNING *",
        [id_voyage,date1,date2,price]
        );  
        const addPrixIntoVoyage = await pool.query(
            "UPDATE public.voyages SET prix = array_append(prix,$1) WHERE id_voyage = $2",
            [price, id_voyage]
            );      
                    
            
        //return
        return res.json(newSejours.rows[0]);

        
    } catch (err) {
        console.error(err.message);
    }
});

// Supprimer un séjour
app.delete("/delete/sejours/:id", async (req, res) => {
    try{
        const { id } = req.params; // WHERE
        const deleteTrip = await pool.query(
            "DELETE FROM public.sejours WHERE id_sejour = $1",
            [id]
        );
        
        res.json("séjours supprimé !");

    } catch (err) {
        console.error(err.message);
    }
});

//voir séjours d'un voyage

app.get("/sejours/:id", async(req,res) => {
    const {id} = req.params;

    try {
        
        const allSejours = await pool.query("SELECT * FROM public.sejours WHERE id_voyage = $1", [id]);

        res.json(allSejours.rows);

    } catch (err) {
        console.error(err.message);
    }
});
//voir tous les séjours 

app.get("/sejours", async(req,res) => {

    try {
        
        const allSejours = await pool.query("SELECT * FROM public.sejours");

        res.json(allSejours.rows);

    } catch (err) {
        console.error(err.message);
    }
});


//voir un séjour

app.get("/showsejour/:id", async(req,res) => {
    const {id} = req.params;

    try {
        
        const allSejours = await pool.query("SELECT * FROM public.sejours WHERE id_sejour = $1", [id]);

        res.json(allSejours.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Upload une photo

app.post("/upload",upload.single('file'), async(req,res) => {
    try {
        return res.send({
            message : req.file.filename
        });
         
    } catch (err) {
        console.error(err.message);
    }
});


// transaction

app.post("/buy", async (req, res) => {
    try{
        const { id_voyage } = req.body;
        const { id_sejour } = req.body;
        const { email } = req.body;
        const { nom } = req.body;
        const { date1 } = req.body;
        const { date2 } = req.body;
        const { price } = req.body;






        const newSejours = await pool.query(
            "INSERT INTO public.transaction (id_voyage,id_sejour,email,nom,date1,date2,price) VALUES ($1,$2,$3,$4,$5,$6,$7)",
            [id_voyage,id_sejour,email,nom,date1,date2,price]
            ); 
    
                    
            
        //return
        return res.json(newSejours.rows[0]);

        
    } catch (err) {
        console.error(err.message);
    }
});

//voir mes reservations

app.get("/transactions/:email", async(req,res) => {
    const {email} = req.params;

    try {
        
        const allSejours = await pool.query("SELECT * FROM public.transaction WHERE email = $1", [email]);

        res.json(allSejours.rows);

    } catch (err) {
        console.error(err.message);
    }
});