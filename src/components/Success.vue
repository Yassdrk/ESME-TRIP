<template>
  <div class="Success">
    <section class="py-5 publier" >
      <div class="container">
    <div class="row align-items-center">
        <div class="col-sm-12">
          
            <h2 style="font-family: 'Poppins', sans-serif;margin-bottom:25px;color:#202857;text-align:center;">Merci pour votre réservation !
        </h2><hr> 
        <section class="text-center">
    <p>
      Nous allons vérifier vos informations et nous vous enverrons une confirmation par email. Besoin d'aide ?<br>
      <a href="mailto:orders@esmetrip.fr">orders@esmetrip.fr</a>
    </p>
  </section>       
		</div>
</div>
</div>
</section>



<Footer/>
</div>
    
</template>

<script>

import Footer from './Footer'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'Success',
  components:{
    Footer,
   
  },
  data: function() {
    return{
       
    };      
  },
  
 

}

</script>


<style>
.formulaire{
	height:auto;
	background-color:white;
	display: flex;
  border:1px solid #DADADA;
	align-items: center;
	justify-content: center;
	color:black;
	
}
</style>