<template>
  <div class="SejourList">
      <div class="global-container">
	<div class="card login-form">
	<div class="card-body">
	<div class="card-text">
		<h3 class="card-title text-center">🔒 Espace Administrateur</h3>
		<br>
		</div>
		<ul class="nav nav-tabs">
  <li class="nav-item">
    <router-link class="nav-link active" to="/admin/triplist">Liste des voyages</router-link>

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
	<router-link class="nav-link" to="/admin/settings">Paramètres</router-link>
  </li>

</ul>

<div v-if="loading"><div  class="d-flex justify-content-center mt-3">
  <div class="spinner-border text-primary" role="status"></div>
</div></div>
    <table v-show="!loading" class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Voyage</th>
      <th scope="col">Description</th>
      <th scope="col">Best Seller (min-max:4)</th>
      <th scope="col">Suppr</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id_voyage">
      <th scope="row">{{ item.id_voyage }}</th>
      <td>{{ item.nom_voyage }}</td>
      <td>{{ item.description }}</td>
      
      <td><form v-on:submit.prevent="removeBest(item.id_voyage)" v-if="item.bestseller == '1'"><button type="submit" class="btn2 btn-warning"><i class="fas fa-minus" aria-hidden="true"></i></button></form><form v-on:submit.prevent="addBest(item.id_voyage)" v-else><button type="submit" class="btn2 btn-success"><i class="far fa-plus-square" aria-hidden="true"></i></button></form>
</td>

      <td><form  v-on:submit.prevent="submit(item.id_voyage)">
<button type="submit" class="btn1 btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>
</button></form></td>
    </tr>
  </tbody>
</table>

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

	name: 'TripList',
	components:{
		Footer
	},
	data (){

		return{
		items: [],
        loading: false,
        setIntervalId: null,
        
      }
	},
    created() {
    this.loading = true;
    this.getTripList();
    this.setIntervalId = setInterval(() => {
    this.getTripList()
    ;
    
}, 500);
  
    
    
    },
    beforeDestroy() {
		clearInterval(this.setIntervalId);
	},

	methods:{
    async getTripList() {
        this.loading = false;
        try {
            const items = await axios.get('http://localhost:5000/voyages/');
            this.items = items.data;
            
            

            
        } catch(err) {
            console.log(err); // handle errors here...
        }
        },

    async submit(id){
        axios.delete(`http://localhost:5000/delete/voyages/${id}`)
    },

    async removeBest(id){
        
        console.log("Suppression de: "+id)
const data = {
				valeur: "0",
				}
        axios.put(`http://localhost:5000/best/${id}`,data)
      
  
		
    },
     async addBest(id){
        
        console.log("Ajout de: "+id)
      const data1 = {
				valeur: "1",
				}
        axios.put(`http://localhost:5000/best/${id}`,data1)

  
		
    }
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



.card-title{ font-weight:300; }

.btn1{
	display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;


}
.btn2{
	display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 0px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;


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
.table{
  margin-top:25px;
  border:1px solid rgba(0,0,0,.125);
  border-radius: 6px 6px 6px 6px;
  -moz-border-radius: 6px 6px 6px 6px;
  -webkit-border-radius: 6px 6px 6px 6px;

}

.login-form{ 
	margin:20px;
}

.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>