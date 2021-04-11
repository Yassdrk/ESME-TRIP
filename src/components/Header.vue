<template>
  <div class="Header">
    <section class="hero d-flex align-items-center">
      <div class="container">
        <h1 style="text-shadow: 2px 2px 10px black;">Découvrez nos voyages<span > d'exception...</span></h1>
        <p class="text-hero" style="text-shadow: 2px 2px 10px black;">Laissez-vous embarquer dans l'une de nos destinations merveilleuses.</p>
        <div class="col-sm-12 ">
          
            <div class="search">
              <form autocomplete="off">
                <div class="autocomplete">
              <input  id="myInput" type="text" v-model="query" v-on:change="getSearchResults();show()" class="search-input" placeholder="Destination (Pays, Ville, Région)" name="q">
              <a href="#" class="search-icon">
              <i class="fas fa-search"></i>
              </a>
              </div>
               
              
              </form>
             
<div class="search-box" v-show="searchResults != ''" id="v-for-object">
                 <div class="mylist" v-for="item in searchResults" v-bind:key="item.nom_voyage">
              <ul style="color:black">
                <router-link :to="`/voyage/${item.id_voyage}`" style="text-decoration:none;color:#202857">
        <li style=" list-style-type: none;cursor: pointer;" >
    <span>{{ item.nom_voyage }}</span>
        </li></router-link>
        </ul>
        </div>
        </div>
        
            </div>
            
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


export default {
  name: 'Header',
  data: function(){

		return{
    query:null,
    searchResults:[],

    }
	},
   created() {
    
    this.getSearchResults();
   
   
    this.setIntervalId = setInterval(() => {
    this.getSearchResults()
    ;
    
}, 10);
    
  },
  
  methods:{
    
  async getSearchResults() {
      
      try {
        const voyages = await axios.get('http://localhost:5000/search?q=' + this.query);
        

        this.searchResults = voyages.data;
        
        
      } catch(err) {
        console.log(err); // handle errors here...
      }
    },
 
    
  }
}

</script>


<style>
.hero{
  background: url('../assets/maldive.jpg') no-repeat;
  background-position: 0px ;
  background-size: cover;
  height:500px;
}
.search-box{
  
  background-color:white;
  position:relative;
  height: auto;
  margin-top:15px;
  left:-10px;
  width: 101.65%;
  z-index:50;
  border: 0.5px solid #ccc;
  border-radius: .6rem;
  border-top-left-radius: 0px 0px;
  border-top-right-radius: 0px 0px;
  cursor: pointer;
  box-shadow: 0 11px 14px 0 rgb(0 0 0 / 20%);
}
.mylist{
    height: 2.9rem;
    padding: 0.6rem 0rem; 
    
}
</style>