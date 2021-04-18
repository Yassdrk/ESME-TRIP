<template>
  <div class="AddDate">
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
  <li class="nav-item">
	<router-link class="nav-link active" to="/admin/settings">Paramètres</router-link>
  </li>

</ul>


<div v-html="Good"></div>
<form method="post" enctype="multipart/form-data" v-on:submit.prevent="submit">
<div class="form-group">
	<label for="exampleFormControlInput1">Logo de mon site :<span style="color:red">*</span></label>
	</div>	<input type="file" class="form-control" ref="file" id="upload" name="file" @change="uploadImage()" accept="image/x-png,image/jpeg,image/jpg">
<div class="form-group">
    <label for="exampleFormControlInput1">Modifier le titre 1 : <span style="color:red">*</span></label>
	</div>
    <input type="text" class="form-control" v-model="modif_text1">
	<div class="form-group">
    <label for="exampleFormControlInput1">Modifier le titre 2 : <span style="color:red">*</span></label>
	</div>
    <input type="text" class="form-control" v-model="modif_text2">
	
<button class="btn btn_sign_in" type="submit">Modifier</button>
</form>
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

	name: 'Settings',
	components:{
		Footer,
	},
	data: function(){

		return{
		
      }
	},
	validations: {
  
	},
	methods:{
	uploadImage() {
	
    const URL = 'http://localhost:5000/upload'; 
	this.file = this.$refs.file.files[0];
	

    let data = new FormData();
    data.append('file', this.file); 


    let config = {
      headers : {
        'Content-Type' : 'multipart/form-data'
		
      }
    }
	

    axios.post(
      URL, 
      data,
      config
    ).then(
      response => {
        console.log('image upload response > ', response)
		this.nom_photos = response.data.message;
		console.log(this.nom_photos)
		return this.nom_photos

      }
    )
  },
  
  submit: function(){
			

				const data = {
				photo: this.nom_photos,
				}
			if(this.nom_photos != null) {	
			this.axios.put("http://localhost:5000/logo/", data)
			.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				
			})
			}
		
			
			
			this.Good = `<div class='alert alert-success' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>Le voyage a bien été publié. 😎</div>`;
		
		
			const data1 = {
				titre1: this.modif_text1,
				titre2: this.modif_text2,
			}
			console.log(this.modif_text1)
			if(typeof(this.modif_text1) !== "undefined" && typeof(this.modif_text2) !== "undefined"){
			this.axios.put("http://localhost:5000/titre/", data1)
			.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				
			})
			}else{
				console.log("Les titres sont vides!")
			}
			
		},
		
	},
		async mounted () {
        console.log(localStorage.getItem('admin'))
		if(localStorage.getItem('admin') != 1){
			this.$router.push('/compte')
		}
    axios
      .get('http://localhost:5000/auth', {withCredentials: true})
      .then(response => (this.results = response, this.show = true), error  => {
		if (error.response.status === 401) {
		//place your reentry code
		console.log("Vous n'êtes pas connecté.")
		
		}
		return error;
		})
		
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