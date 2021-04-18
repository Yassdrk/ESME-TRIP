<template>
  <div class="Slider">
    <div id="section">
    <h2>NOS MEILLEURES DESTINATIONS</h2>
    <div id="cards_landscape_wrap-2">
    <div class="container">
    <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" v-for="voyage in voyages" :key="voyage.id_voyage">
    <div class="card-flyer">
    <div class="text-box">
    <div class="image-box">
    <img :src="'http://localhost:5000/'+`${voyage.photos}`" alt="" />
    </div>
    <div class="text-container">
    <h6>{{voyage.nom_voyage}}</h6>
    <p>{{voyage.description_detaillee | truncate(200)}}</p>
    <router-link :to="`/voyage/`+`${voyage.id_voyage}`" style="color:white">
	<button type="button" class="test btn btn-dark bg-warning ">Réserver</button></router-link>
	</div>
  
    </div>
    </div>
    
    </div>
    </div>
    </div>
    </div></div>
    
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
  name: 'Slider',
  data () {
    return {
    voyages: [],
    loading: false,
    setIntervalId: null,
    }
  },
  filters: {
  truncate(string, value) {
    return string.substring(0, value) + '…';
  }
  },
  created() {
    this.getVoyages();
    this.setIntervalId = setInterval(() => {
    this.getVoyages();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.setIntervalId);
  },
  methods: {
    async getVoyages() {
    this.loading = true;
      try {
        const voyages = await axios.get('http://localhost:5000/best/');
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