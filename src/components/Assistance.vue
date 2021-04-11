<template>
  <div class="Assistance">
      <div class="global-container">
	
	<div  class="card login-form">
		
	<div class="card-body">
		<h2 style="text-align:center;font-family: 'Poppins', sans-serif;margin-bottom:25px;color:#202857;">Assistance</h2><hr>
	<div class="card-text" style="text-align:center">
		Vous avez besoin d'aide concernant une réservation ? Contactez notre assistance téléphonique disponible 5j/7 de 9h à 18h au 0769905040
		
	</div>
	
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
			

			
		}
		

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