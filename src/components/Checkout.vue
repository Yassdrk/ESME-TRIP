<template>
  <div class="Checkout">
      <div class="global-container">
	<div class="card login-form">
	<div class="card-body">
	<div class="card-text">
		<h3 class="card-title text-center">Récapitulatif</h3>
		<br>
		</div>
	
<span style="font-size:18px;">
<b style="color:#002060">Nom du voyage :</b> {{results.data.nom_voyage}}<br><br>
<b style="color:#002060">Date du séjour :</b> Du {{results2.date1}} au {{results2.date2}} inclus.<br><br>
<b style="color:#002060">Total :</b> {{results2.price}}€ 
</span>
<form method="post" v-on:submit.prevent="submit">
<button type="submit" class="btn_sign_in">Payer</button></form>

    
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

	name: 'Checkout',
	components:{
		Footer
	},
	data (){

		return{
		items: [],
        loading: false,
        setIntervalId: null,
        id: this.$route.params.id,
        id2: this.$route.params.id2,
        results: [],
        results2: "",
        user:[],
        vovo:[],
      }
	},
    created(){
        this.axios.get("http://localhost:5000/auth/", {withCredentials: true}).then((response) =>{
	this.user = response.data})

        
    },
   

	methods:{
 submit: function(){

      

            const data = {
            id_voyage: this.id,
            id_sejour: this.id2,
            email: this.user.email,
            nom: this.results.data.nom_voyage,
            date1: this.results2.date1,
            date2: this.results2.date2,
            price: this.results2.price,
            }
            
            if(localStorage.getItem("token") !== null ){
                this.axios.post("http://localhost:5000/buy/", data)
                this.$router.push('/success')
            }else{
                this.$router.push('/login')
            }
            
    }      
	},
  
	async mounted () {
    axios
      .get('http://localhost:5000/voyages/'+ this.id)
      .then(response => (this.results = response, this.show = true))
    axios
    .get('http://localhost:5000/showsejour/'+ this.id2)
    .then((response) => {this.results2 = response.data})
    

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
    width:500px;
}

.sign-up{
	text-align:center;
	padding:20px 0 0;
}
</style>