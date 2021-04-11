<template>
  <div class="Signup">
      <div class="global-container">
	<div class="card login-form">
	<div class="card-body">
		<h3 class="card-title text-center">Mon compte</h3>
        <div v-html="ERREUR"></div>
        
		<div class="card-text">
			<!--
			<div class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> -->
			<form method="post" v-on:submit.prevent="submit">
				<div class="form-group">
					<label for="nom">Nom <span style="color:red">*</span></label>
					<input v-model.trim="nom" :class="{'is-invalid': validationStatus($v.nom)}" type="text" class="form-control form-control-sm" id="nom" name="nom" aria-describedby="emailHelp">
                    <div v-if="!$v.nom.required" class="invalid-feedback">Le nom est obligatoire.
                    </div>
                </div>
                <div class="form-group">
					<label for="prenom">Prénom <span style="color:red">*</span></label>
					<input v-model.trim="prenom" :class="{'is-invalid': validationStatus($v.prenom)}" type="text" class="form-control form-control-sm" id="prenom" name="prenom" aria-describedby="emailHelp">
                    <div v-if="!$v.prenom.required" class="invalid-feedback">Le prénom est obligatoire.</div>
                </div>
				<div class="form-group">
					<label for="email">Adresse email <span style="color:red">*</span></label>
					<input v-model.trim="email" :class="{'is-invalid': validationStatus($v.email)}" type="email" class="form-control form-control-sm" id="email" name="email" aria-describedby="emailHelp">
					<div v-if="!$v.email.required" class="invalid-feedback">L'email est obligatoire.</div>
                </div>
				<div class="form-group">
					<label for="pass">Mot de passe <span style="color:red">*</span></label>
                    <input v-model.trim="pass" :class="{'is-invalid': validationStatus($v.pass)}" type="password" class="form-control form-control-sm" id="mdp" name="pass">
                    <div v-if="!$v.pass.required" class="invalid-feedback">Le mot de passe est obligatoire.</div>
                </div>
				<button type="submit" class="btn_sign_in">Inscription</button>
				
				<div class="sign-up">
					Déjà inscrit ? <router-link style="color:#0d6efd;text-decoration:underline;" to="/login">Se connecter</router-link>
				</div>
			</form>
		</div>
	</div>
</div>
</div>
<Footer/>
    </div>
</template>

<script>
import Footer from './Footer'
import { required } from 'vuelidate/lib/validators'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'Signup',
  components:{
    Footer
  },
  data: function(){
      return{
          nom: null,
          prenom: null,
          email: null,
          pass: null,
          ERREUR: null,        
      }
  },
  validations: {
      nom:{required},
      prenom:{required},
      email:{required},
      pass:{required}
  },
  methods:{

    validationStatus: function(validation) {
        return typeof validation != "undefined" ? validation.$error : false;    
    },
    submit: function(){

        this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

            const data = {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            pass: this.pass,
        };

            // Retourne le nombre d'email identique
            this.axios.get(`http://localhost:5000/checkEmail/${data.email}`).then((response) => {
            console.log("Nbre email identique:")
            const nbreEmail = response.data
            console.log(nbreEmail);  
            if (nbreEmail !=0){
                this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>L'adresse email est déjà utilisée.</div>`;
            } else {

                // Si l'email n'est pas utilisé alors on insère les données
                
                this.axios.post("http://localhost:5000/users/", data)
                this.$router.push('/login');
               
            }      
        })
        

    
        

    }    
  }
}
</script>


<style scoped>
.global-container{
	height:100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
}

form{
	padding-top: 10px;
	font-size: 14px;
	margin-top: 30px;
}

.card-title{ font-weight:300; }

.btn{
	font-size: 14px;
	margin-top:20px;
}
.btn_sign_in{
    font-size: 14px;
	margin-top:20px;
    width:100%;
    background-color:#0d6efd;
    border:0;
    color:white;
    padding:5px;
}

.login-form{ 
	width:330px;
	margin:20px;
}

.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>