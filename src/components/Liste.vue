<template>
  <div class="Liste">
      <section style="background-color:white;" class="d-flex justify-content-center">
 <div class="py-5">
    <div class="container">
	<h2 style="text-align:center;font-family: 'Poppins', sans-serif;margin-bottom:25px;color:#202857;">Nos excursions disponibles</h2>
	<hr>
     <br>
      <div class="row">
        
 

  <div v-if="loading"></div>
  <div class="col-md-4 " v-for="voyage in voyages" :key="voyage.id_voyage"> 
          <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
     <img :src="'http://localhost:5000/'+`${voyage.photos}`" width="100%" height="202px" style="object-fit:cover;  object-position: 75% 50%; ">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"  style="text-transform: uppercase;font-family: 'Poppins', sans-serif;color:#202857;"><router-link :to="`/voyage/${voyage.id_voyage}`" style="text-decoration:none;color:#202857">{{ voyage.nom_voyage }}</router-link></h5>
       <hr style="width:10%"><p class="card-text">{{ voyage.description }}</p>
        <p class="card-text"><span class="badge bg-primary" v-if="voyage.prix !== null" >À partir de {{ Math.min.apply(Math, voyage.prix) }}€ TTC</span><span v-else class="badge bg-danger">Aucun séjour disponible</span>
</p>
      </div>
    </div>
  </div>
</div>

        </div>
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
  name: 'Liste',
  components:{
      Footer
      
  },
  data () {
    return {
    voyages: [],
    loading: false,
    setIntervalId: null,
    }
  },
  created() {
    this.getVoyage();
    this.setIntervalId = setInterval(() => {
    this.getVoyage();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.setIntervalId);
  },
  methods: {
    async getVoyage() {
    this.loading = true;
      try {
        const voyages = await axios.get('http://localhost:5000/voyages/');
        this.voyages = voyages.data;
        this.loading = false;
      } catch(err) {
        console.log(err); // handle errors here...
      }
    },
   
  
  }
   
     
  

  
}
</script>


<style>

</style>