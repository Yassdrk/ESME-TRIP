<template>
  <div class="Compte">
      <div class="global-container">
		<div v-html="ERREUR"></div>
		
	<div class="card login-form" v-show="results.prenom !='' && results.prenom != null">
	<div class="card-body">
	<div class="card-text">
		<h3 class="card-title text-center" style="color:rgb(32, 40, 87)">Bienvenue, {{ results.prenom }} {{ results.nom }}</h3>
		<br>
		</div>
		<ul class="nav nav-tabs">
  <li class="nav-item">
	<router-link class="nav-link" to="/compte">Mes informations</router-link>
  </li>
  <li class="nav-item">
	<router-link class="nav-link active" to="/mytrip">Mes réservations</router-link>
  </li>

 
</ul>

<table v-show="!loading" class="table">
  <thead>
    <tr>
      <th scope="col">Destination</th>
      <th scope="col">Du</th>
      <th scope="col">Au</th>
      <th scope="col">Prix</th>

    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id_sejour">
      <th scope="row"><router-link :to="`/voyage/${item.id_voyage}`" style="text-decoration:none;color:#202857">{{ item.nom }}</router-link></th>
      <td>{{ item.date1 }}</td>
      <td>{{ item.date2 }}</td>     
      <td>{{ item.price }}€</td>      
 
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

// Require dependencies
var VueCookies = require('vue-cookies');
// Tell Vue to use the plugin
Vue.use(VueCookies);
 
Vue.use(VueAxios, axios)



export default {

	name: 'MyTrip',
	components:{
		Footer
	},
	
	data: function (){
		


		return{
			
			results: {},
			loading: false,
			setIntervalId: null,
      email:null,
			ERREUR:null,
			PANELADMIN:null,
      items:[],
			
		}
		

	},
    created() {
    this.loading = true

    this.getTripList();
    this.setIntervalId = setInterval(() => {
    this.getTripList();    
}, 100);
    
   

    this.getInfos();
    this.setIntervalId = setInterval(() => {
    this.getInfos();    
}, 1000);
  
    
    
    },
    beforeDestroy() {
		clearInterval(this.setIntervalId);
	},
	
	
	methods:{
        async getInfos () {
			
			
				await axios.get('http://localhost:5000/auth', {withCredentials: true})
				.then((response) => {
				this.results = response.data,
				this.loading = false
        this.email = this.results.email
				})
				.catch(error => {
				console.clear()
				this.ERREUR = `<div class='alert alert-danger' style='margin-bottom:-20px;margin-top:20px;' role='alert'/>`+error.response.data.message+`</div>`;
				});
				
			
		},
     async getTripList() {
        this.loading = false;
        try {
            const items = await axios.get('http://localhost:5000/transactions/'+this.email);
            this.items = items.data;
            console.log(this.items.email)
            

            
        } catch(err) {
            console.log(err); // handle errors here...
        }
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
	
}
.table{
  margin-top:25px;
  border:1px solid rgba(0,0,0,.125);
  border-radius: 6px 6px 6px 6px;
  -moz-border-radius: 6px 6px 6px 6px;
  -webkit-border-radius: 6px 6px 6px 6px;

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