<template>
  <div class="Voyage">
    
     <section class="py-5 publier" >
      <div class="container">
    <div class="row align-items-center">
        <div class="col-sm-12">
          
            <h2 style="font-family: 'Poppins', sans-serif;margin-bottom:25px;color:#202857;text-align:center;">Détails du voyage
        </h2><hr>        
		</div>
</div>
<section class="py-0 formulaire">
<div class="container" v-if="show">
    <div class="row py-3 ">
    <div class="col-md-12" >
      <h4 style="font-family: 'Poppins', sans-serif;margin-bottom:25px;color:#202857;text-align:center;">
{{ results.data.nom_voyage }}</h4>
	
	<carousel :per-page="1" :navigate-to="someLocalProperty" class="carouselItem" :mouse-drag="false">
    <slide>
      <img :src="'http://localhost:5000/'+`${results.data.photos}`" class="d-block">
    </slide>
    
  </carousel>
	

   
	<div class="text-center">
	<p style="color:#202857;font-family:'Poppins', sans-serif;margin-top:20px;margin-bottom:20px;font-size:14px">{{results.data.description}}</p></div>
	

<h6 style="text-transform:uppercase;color:#202857;font-family:'Poppins', sans-serif;margin-bottom:10px;" >
Description détaillée
</h6><div style="color:black;font-size:14px;font-family:'Poppins', sans-serif;margin-bottom:20px;">{{results.data.description_detaillee}}</div>



<div id="app">
<h6 style="text-transform:uppercase;">
  <div class="form-group">
    <label for="exampleFormControlSelect1" style="color:#202857;font-family:'Poppins', sans-serif;margin-bottom:10px;">Choisir la date de mon séjour</label>
	<select  @change="onChange()" class="form-select"  id="exampleFormControlSelect1" v-model="selected"><option disabled value="">Sélectionnez la date</option><option v-for="item in items" v-bind:value="item.price" :name="item.id_sejour" :key="item.id_sejour" >Séjour du {{ item.date1 }} au {{ item.date2  }}</option>
   </select>
</div>
</h6><h3 style="text-transform:uppercase;color:#202857;margin-top:20px;font-family:'Poppins', sans-serif;">
Tarif TTC : <span v-if="selected != ''">{{selected}}€</span><span style="font-size:15px" v-else>Sélectionnez un séjour pour voir le prix.</span>


</h3>
</div>

<p style="font-size:11px;font-style: italic;color:#202857;">(frais de transactions en ligne inclus)</p>


<div class="text-center"><router-link v-if="results.data.id_voyage && idsej !== null" :to="`/checkout/${results.data.id_voyage}/${idsej}`" style="text-align:center;margin-top:-20px;" class="btn bg-warning text-dark">Réserver ce séjour</router-link></div>


	
  </div>
</div>
  </div>
  </section>
</div>

</section>
<Footer/>
    </div>
    
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

import Footer from './Footer'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  name: 'Voyage',
  components:{
    Footer,
    Carousel,
    Slide
  },
  data: function() {
    return{
        selected:'',
        id: this.$route.params.id,
        results: [],
        show: false,
        items: [],
        loading: false,
        setIntervalId: null,
        idsej: null,
       
    };      
  },
  created() {
    this.loading = true;
    this.getSejoursList();
    this.setIntervalId = setInterval(() => {
    this.getSejoursList()
    ;
    
}, 1000);

    },
    beforeDestroy() {
		clearInterval(this.setIntervalId);
	},
  methods:{
     onChange: function() {
      var options = event.target.options
      if (options.selectedIndex > -1) {
        var name = options[options.selectedIndex].getAttribute('name');
        this.idsej = name;
      }
    },
 async getSejoursList() {
        this.loading = false;
        try {
            const items = await axios.get('http://localhost:5000/sejours/'+ this.id);
            this.items = items.data;
            
            

            
        } catch(err) {
            console.log(err); // handle errors here...
        }
        }
  },
 
  mounted () {
    axios
      .get('http://localhost:5000/voyages/'+ this.id)
      .then(response => (this.results = response, this.show = true))
  }
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