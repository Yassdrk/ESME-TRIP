<template>
  <div class="AddTrip">
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
	<router-link class="nav-link active" to="/admin/addtrip">Ajouter un voyage</router-link>
  </li>
 <li class="nav-item">
	<router-link class="nav-link" to="/admin/adddate">Ajouter un séjour</router-link>
  </li>
</ul>
<div v-html="ERREUR"></div>
<div v-html="Good"></div>


<form method="post" enctype="multipart/form-data" v-on:submit.prevent="submit">
	<div class="form-group">
	<label for="exampleFormControlInput1">Photos du voyage<span style="color:red">*</span></label>
	</div>
	<div class="input-group mb-3">
	<input type="file" class="form-control" ref="file" id="upload" name="file" multiple="multiple" @change="uploadImage()" accept="image/x-png,image/jpeg,image/jpg">
	</div>
	<div class="form-group">
    <label for="exampleFormControlInput1">Titre du voyage <span style="color:red">*</span></label>
	</div>
    <input type="text" v-model.trim="nom_voyage" :class="{'is-invalid': validationStatus($v.nom_voyage)}" class="form-control" id="nom_voyage" placeholder="ex: Roadtrip au Kenya" >
	<div v-if="!$v.nom_voyage.required" class="invalid-feedback">Le nom du voyage est obligatoire.</div>
	<div class="form-group">
	<label for="exampleFormControlInput1">Description brève <span style="color:red">*</span></label>
    <input type="text" v-model.trim="description" :class="{'is-invalid': validationStatus($v.description)}" class="form-control" id="description" placeholder="ex: Découvrez la faune et la flore de notre pays exceptionnel" >
	<div v-if="!$v.description.required" class="invalid-feedback">La description du voyage est obligatoire.</div>
	</div>
	<div class="form-group">
	<label for="exampleFormControlTextarea1">Description détaillée <span style="color:red">*</span></label>
    <textarea class="form-control" v-model.trim="description_detaillee" :class="{'is-invalid': validationStatus($v.description_detaillee)}" style="font-size:14px" id="description_detaillee" rows="3" placeholder="ex: Au coeur d'un parc régional au Kenya, partez au coeur de la réserve nationale du masai mara..."></textarea>
	<div v-if="!$v.description_detaillee.required" class="invalid-feedback">La description détaillée est obligatoire.</div>
	</div>
	
<button class="btn btn_sign_in" type="submit">Publier</button>
</form>

</div>
	
</div>

</div>
<Footer/>
    </div>
</template>

<script>
import Footer from './Footer'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
var VueCookies = require('vue-cookies');
// Tell Vue to use the plugin
Vue.use(VueCookies);

export default {

	name: 'AddTrip',
	components:{
		Footer
	},
	data: function(){

		return{
		results: {},
        nom_voyage: null,
        description: null,
        description_detaillee: null,
        ERREUR: null,
		file:'', 
		Good: null,
		nom_photos:null,
      }
	},
	validations: {
    nom_voyage:{required},
    description:{required},
    description_detaillee:{required},
    
	},
	methods:{

		validationStatus: function(validation) {
			return typeof validation != "undefined" ? validation.$error : false;    
		},
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
			this.$v.$touch();
			if (this.$v.$pendding || this.$v.$error) return;

				const data = {
				nom_voyage: this.nom_voyage,
				description: this.description,
				description_detaillee: this.description_detaillee,
				photos: this.nom_photos,

			};
			this.axios.post("http://localhost:5000/voyages/", data)
			.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				
			})
			
			
			this.Good = `<div class='alert alert-success' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>Le voyage a bien été publié. 😎</div>`;
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