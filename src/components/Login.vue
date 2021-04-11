<template>
  <div class="Login">
      <div class="global-container">
	<div class="card login-form">
	<div class="card-body">
		<h3 class="card-title text-center">Mon compte</h3>
        <div v-html="ERREUR"></div>

		<div class="card-text">
			
			<form  v-on:submit.prevent="submit">
				<div class="form-group">
					<label for="exampleInputEmail1">Adresse email</label>
					<input type="email" v-model.trim="email" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-sm" id="email" aria-describedby="emailHelp">
				<div v-if="!$v.email.required" class="invalid-feedback">L'email est obligatoire.
                </div>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Mot de passe</label>
					<a href="#" style="float:right;font-size:12px;">Mot de passe oublié?</a>
					<input type="password" v-model.trim="pass" :class="{'is-invalid': validationStatus($v.pass)}" class="form-control form-control-sm" id="pass">
				<div v-if="!$v.pass.required" class="invalid-feedback">Le mot de passe est obligatoire.
                </div>
				</div>
				<button type="submit" class="btn_sign_in">Connexion</button>
				
				<div class="sign-up">
					Pas encore inscrit ? <router-link style="color:#0d6efd;text-decoration:underline;" to="/signup">S'inscrire</router-link>
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
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import VueAxios from 'vue-axios'
Vue.use(VueCookies)
Vue.use(VueAxios, axios)

export default {

	name: 'Login',
	components:{
		Footer
	},
	data(){
		
		return{
			email: null,
			pass: null,
			ERREUR: null
		}
	},
	validations: {
	email:{required},
	pass:{required}
	},
	methods:{
		validationStatus: function(validation) {
        return typeof validation != "undefined" ? validation.$error : false;    
    },
		async submit (){
		this.$v.$touch();
        if (this.$v.$pendding || this.$v.$error) return;

            
			const data = {
			email: this.email,
			pass: this.pass,
			};
			function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
			const token = makeid(70);
			axios.defaults.headers.common['Authorization'] = token;
		

			axios.post("http://localhost:5000/login", data, {withCredentials: true},{Headers:localStorage.setItem('token', token) })
			.then(response1 => {
			console.log(response1)
			// Vérifie si ADMIN
				this.axios.get(`http://localhost:5000/admin/${data.email}`).then((response) => {
				const isAdmin = response.data
				localStorage.setItem('admin', isAdmin)
				this.$router.push('/compte')})
				
			})
			.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				if(error.response.data.message == "Le mot de passe est incorrect."){
		localStorage.removeItem('token');
	}else if(error.response.data.message == "Le compte n'existe pas."){
		localStorage.removeItem('token');

	}
			});
		

			
			
		},


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
    padding:5%;
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