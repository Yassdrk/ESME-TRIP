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
	<router-link class="nav-link active" to="/admin/adddate">Ajouter un séjour</router-link>
  </li>
   <li class="nav-item">
	<router-link class="nav-link" to="/admin/settings">Paramètres</router-link>
  </li>
  
</ul>


<div v-html="Good"></div>
<form method="post" enctype="multipart/form-data" v-on:submit.prevent="submit">
<div class="form-group">
	<label for="exampleFormControlInput1">Choisir le voyage<span style="color:red">*</span></label>
	</div>
<select class="form-select form-control" v-model.trim="valeur" style="font-size: 14px;" aria-label="Default select example">
  <option selected v-for="item in items" :value="item.id_voyage" :class="{'is-invalid': validationStatus($v.valeur)}" :key="item.id_voyage">{{ item.nom_voyage }}</option>
</select>
<div v-if="!$v.valeur.required" class="invalid-feedback">Le voyage est obligatoire.</div>
<div class="form-group">
	<label for="exampleFormControlInput1">Choisir les dates du séjour<span style="color:red">*</span></label>
	</div>
	<div class="input-group">
<input type="date" class="form-control" id="date1" :class="{'is-invalid': validationStatus($v.date1)}" v-model.trim="date1" name="date1" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
<div v-if="!$v.date1.required" class="invalid-feedback">La date est obligatoire.</div>
<input type="date" class="form-control" id="date2" :class="{'is-invalid': validationStatus($v.date2)}" v-model.trim="date2" name="date2" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
<div v-if="!$v.date2.required" class="invalid-feedback">La date est obligatoire.</div>
</div>
<div class="form-group">
    <label for="validationTooltip04">Prix du séjour (en €) <span style="color:red">*</span></label>
    <input type="text" v-model.trim="prix" :class="{'is-invalid': validationStatus($v.prix)}" class="form-control" id="prix" placeholder="ex: 1645">
    <div v-if="!$v.prix.required" class="invalid-feedback">Le prix est obligatoire.</div>
	</div>
<button class="btn btn_sign_in" type="submit">Ajouter le séjour au voyage</button>
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

	name: 'AddDate',
	components:{
		Footer,
	},
	data: function(){

		return{
		items: [],
        loading: false,
        setIntervalId: null,
		valeur: null,
		date1: null,
		date2: null,
		prix: null,
      }
	},
	created() {
    this.loading = true;
    this.getTripList();
    this.setIntervalId = setInterval(() => {
    this.getTripList()
	console.log(this.date1 +" "+this.date2)
    ;
    
}, 1000);
    },
    beforeDestroy() {
		clearInterval(this.setIntervalId);
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
	validations: {
    date1:{required},
    date2:{required},
    valeur:{required},
	prix:{required}
	},
	methods:{
		validationStatus: function(validation) {
			return typeof validation != "undefined" ? validation.$error : false;    
		},
		async getTripList() {
        this.loading = false;
        try {
            const items = await axios.get('http://localhost:5000/voyages/');
            this.items = items.data;
            
            

            
        } catch(err) {
            console.log(err); // handle errors here...
        }
        },
	
		submit: function(){
			this.$v.$touch();
			if (this.$v.$pendding || this.$v.$error) return;

				const data = {
				date1: this.date1,
				date2: this.date2,
				id_voyage: this.valeur,
				price: this.prix,
			};
			this.axios.post("http://localhost:5000/sejours/", data)
			.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				
			})
			
			
			this.Good = `<div class='alert alert-success' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>Le séjour a bien été ajouté 😎</div>`;
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
.size_form{
	font-size:14px !important;
	border-radius:0px !important;
}
.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>