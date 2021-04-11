<template>
  <div class="Compte">
      <div class="global-container">
		<div v-html="ERREUR"></div>
		<div v-if="loading">Chargement de votre profil...<div  class="d-flex justify-content-center mt-5">

  <div class="spinner-border text-primary" role="status"></div>
</div></div>
	<div v-else v-show="results.prenom !='' && results.prenom != null" class="card login-form">
	<div class="card-body">
	<div class="card-text">
		<h3 class="card-title text-center" style="color:rgb(32, 40, 87)">Bienvenue, {{ results.prenom }} {{ results.nom }}</h3>
		<br>
		</div>
		<ul class="nav nav-tabs">
  <li class="nav-item">
	<router-link class="nav-link active" to="/compte">Mes informations</router-link>
  </li>
  <li class="nav-item">
	<router-link class="nav-link" to="/mytrip">Mes réservations</router-link>
  </li>

 
</ul>

<form method="post" v-on:submit.prevent="submit" >

	<div class="form-group">
    <label for="exampleFormControlInput1">Modifier mon nom <span style="color:red">*</span></label>
	</div>
    <input type="text" class="form-control" v-model="modif_nom" id="modif_nom" :placeholder=' "Nom actuel: "+ results.nom' >
	<div class="form-group">
	<label for="exampleFormControlInput1">Modifier mon prénom <span style="color:red">*</span></label>
    <input type="text" class="form-control" v-model="modif_prenom" id="modif_prenom" :placeholder=' "Prénom actuel: "+ results.prenom' >
	</div>
	
	
	
<button class="btn btn_sign_in" type="submit">Modifier mon profil</button>
</form>
<form method="post" v-on:submit.prevent="logout" >
<button class="btn btn_logout" type="submit">Déconnexion</button>

</form>
<router-link v-html="PANELADMIN"  to="/admin/"></router-link>







	</div>
</div>
 


</div>
<Footer/>
    </div>
</template>

<script>
import Footer from './Footer'
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'

// Require dependencies
var VueCookies = require('vue-cookies');
// Tell Vue to use the plugin
Vue.use(VueCookies);
 
Vue.use(VueAxios, axios)



export default {

	name: 'Compte',
	components:{
		Footer
	},
	
	data: function (){
		


		return{
			
			results: {},
			loading: false,
			setIntervalId: null,
			modif_nom: null,
			modif_prenom: null,
			vide: null,
			ERREUR:null,
			PANELADMIN:null,

			
		}
		

	},
	async created() {
		
    this.getInfos();
    this.setIntervalId = setInterval(() => {
    this.getInfos();
    }, 1000);
	await axios.get('http://localhost:5000/auth', {withCredentials: true})
	.then((response) =>{
	this.results = response.data,	
	localStorage.setItem('userId', this.results.id_user)
	})
	.catch(error => {
	console.clear()
	this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;

	},this.$router.push('/login'));

	
	},
	beforeDestroy() {
		clearInterval(this.setIntervalId);
	},
	async mounted(){
		if(localStorage.getItem('token') == null){
			this.$router.push('/login')
		}
		if(localStorage.getItem('admin') == 1){
			this.PANELADMIN = "<button class='btn btn-warning' style='width:100%;margin-top:-5px;font-size:14px;'>Espace administrateur</button>"
		}
	},
	methods:{
		async getInfos () {
			
			
				await axios.get('http://localhost:5000/auth', {withCredentials: true})
				.then((response) => {
				this.results = response.data,
				this.loading = false
				})
				.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				});
				
			
			
		},
		submit: function(){
				const data1 = {
					nom: this.modif_nom,
					prenom: this.modif_prenom,

				};			
				this.axios.put('http://localhost:5000/users/'+localStorage.getItem('userId'), data1);			  
		},
		logout: function(){
			const vide = {
				vide: this.vide,
			};
			
			this.axios.post('http://localhost:5000/logout/', vide, {withCredentials: true},{Headers:localStorage.removeItem('token')}).then(localStorage.removeItem('admin'), localStorage.removeItem('userId'));
			this.$router.push('/login');

		
			
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
    padding:4%;
}

form{
	padding-top: 10px;
	font-size: 14px;
	margin-top: 30px;
	
}

.card-title{ font-weight:300; }

.btn{
	font-size: 14px;
	
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
.btn_logout{
    font-size: 14px;
	margin-top:-45px;
	
    width:100%;
    background-color:#dc3545;
    border:0;
    color:white;
    
}

.login-form{ 
	width:600px;
	margin:20px;
}

.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>