<template>
  <div class="Admin">
      <div class="global-container">
	<div class="card login-form">
	<div class="card-body">
	<div class="card-text">
		<h3 class="card-title text-center">🔒 Espace Administrateur</h3>
		<br>
		</div>
		<ul class="nav nav-tabs">
  <li class="nav-item">
    <router-link class="nav-link" to="/admin/triplist">Liste des voyages</router-link>

  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/admin/sejourslist">Liste des séjours</router-link>

  </li>
  <li class="nav-item">
    <router-link class="nav-link" to="/admin/userlist">Liste des utilisateurs</router-link>
  </li>
  <li class="nav-item">
	<router-link class="nav-link" to="/admin/addtrip">Ajouter un voyage</router-link>
  </li>
  <li class="nav-item">
	<router-link class="nav-link" to="/admin/adddate">Ajouter un séjour</router-link>
  </li>
 
</ul>
<br>
<div v-html="ERREUR"></div>
<div v-if="loading" ><div  class="d-flex justify-content-center mt-0">

  <div class="spinner-border text-primary" role="status"></div>
</div></div>
<div v-else id="user_infos">
Bienvenue sur l'espace Administrateur,

{{ results.data.prenom }} {{ results.data.nom }}.</div>
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

Vue.use(VueAxios, axios)
var VueCookies = require('vue-cookies');
// Tell Vue to use the plugin
Vue.use(VueCookies);

export default {

	name: 'Admin',
	components:{
		Footer
	},
	data: function(){

		return{
		results: {},
		ERREUR:null,
		loading: true,
          
      }
	},	
	async mounted () {
		console.log(localStorage.getItem('admin'))
		if(localStorage.getItem('admin') != 1){
			this.$router.push('/compte')
		}
    await axios
      .get('http://localhost:5000/auth', {withCredentials: true})
      .then(response => (this.results = response, this.loading = false))
		.catch(error => {
		console.clear()
		this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				
		});
		
	},	
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
	margin:20px;
}

.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>