<template>

  <div id="app">
<nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container-fluid">
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <div class="navbar-nav">
            <router-link class="nav-link font-nav" to="/">Accueil</router-link>
            <router-link class="nav-link font-nav" to="/liste">Excursions</router-link>
            
    
    
        <a class="navbar-brand mx-2 " href=""><img src="../src/assets/ESME TRIP.png" width="150px"></a>
            <router-link class="nav-link font-nav" to="/assistance">Assistance</router-link>
             <router-link class="nav-link font-nav" to="/login">Compte</router-link>
          </div>
        </div>
      </div>
    </nav>    
    <router-view></router-view>
 
   </div>
</template>

<script>





export default {
  name: 'App'
}


</script>

<style>
body {
	
	background-color: white !important;
}
.navbar{
	
	background-color: #002060 !important;
	-webkit-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.35);
-moz-box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.35);
box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.35);
	
}
.font-nav{
	
	font-family: 'Poppins', sans-serif;
	color:white !important;
	margin-top:7%;	
	text-transform: uppercase;
}

.navbar-nav .nav-link {
    margin-right: 25px;
    margin-left: 25px;
}
.img-header{
	background-image:url('./assets/maldive.jpg');
	background-repeat: no-repeat;
	padding-top:7%;
  height:400px;
	font-family: 'Poppins', sans-serif;
	text-shadow: black 1px 0 15px;
	color:white;
	background-size: cover;
	background-position: 0px ; 

}

h1{
	font-family: 'Poppins', sans-serif;
	color:white;
	
}
.text-hero{
	font-family: 'Poppins', sans-serif;
	color:white;
	
}

.btn-header{
	border: 3px solid white !important;
	border-radius:0px !important;
	color:white !important;
	background-color: rgba(0, 0, 255, 0) !important;
	font-family: 'Poppins', sans-serif;
}
input.form-control{
	
	font-size:14px;
	
}
.center_div{
    margin: 0 auto;
    width:80%;
}
#section{
	height:700px;
	background-color:#002060;
	font-family: 'Poppins', sans-serif;
	text-align:center;
  padding-top:40px;
	color:white;
	

}
#cards_landscape_wrap-2{
  text-align: center;
}
#cards_landscape_wrap-2 .container{ 
  padding-bottom: 100px;
}
#cards_landscape_wrap-2 a{
  text-decoration: none;
  outline: none;
}
#cards_landscape_wrap-2 .card-flyer {
  border-radius: 3px;
  overflow:hidden;
}
#cards_landscape_wrap-2 .card-flyer .image-box{
  background: #ffffff;
  overflow: hidden;  
}
#cards_landscape_wrap-2 .card-flyer .image-box img{
  -webkit-transition:all .9s ease; 
  -moz-transition:all .9s ease; 
  -o-transition:all .9s ease;
  -ms-transition:all .9s ease; 
  width: 100%;
  height: 200px;
}
#cards_landscape_wrap-2 .card-flyer:hover .image-box img{
  opacity: 0.7;
  -webkit-transform:scale(1.15);
  -moz-transform:scale(1.15);
  -ms-transform:scale(1.15);
  -o-transform:scale(1.15);
  transform:scale(1.15);
}
#cards_landscape_wrap-2 .card-flyer .text-box{
  text-align: center;
}
#cards_landscape_wrap-2 .card-flyer .text-box .text-container{
  padding: 30px 18px;
}
#cards_landscape_wrap-2 .card-flyer{
  background: #FFFFFF;
  margin-top: 50px;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.40);
}
#cards_landscape_wrap-2 .card-flyer:hover{
  background: #fff;
  box-shadow: 0px 15px 26px rgba(0, 0, 0, 0.50);
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  margin-top: 50px;
}
#cards_landscape_wrap-2 .card-flyer .text-box p{
  margin-top: 10px;
  margin-bottom: 0px;
  padding-bottom: 0px; 
  font-size: 14px;
  letter-spacing: 1px;
  color: #000000;
}
#cards_landscape_wrap-2 .card-flyer .text-box h6{
  margin-top: 0px;
  margin-bottom: 4px; 
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto Black', sans-serif;
  letter-spacing: 1px;
  color: #202857;
}
button.btn.btn-dark{
	border-radius:0px;
	margin-bottom:-25px;
}
.txt-footer{
	color:#000000;
	font-family: 'Poppins', sans-serif;
	text-align:center;
	background-color:white;
	margin-bottom:20px;
	
}
#product_list{
	
	background-color:white;
	height:500px;	
	margin-bottom:10px;
	
}
.search {
    width: 100%;
    margin-bottom: auto;
    margin-top: 50px;
    height: 50px;
    background-color: #fff;
    padding: 10px;
    border-radius: 0px;
    -webkit-box-shadow: 0px 0px 14px 1px rgba(0,0,0,0.10);
    -moz-box-shadow: 0px 0px 14px 1px rgba(0,0,0,0.10);
    box-shadow: 0px 0px 14px 1px rgba(0,0,0,0.10);
                
}

.search-input {
    color: white;
    border: 0;
    outline: 0;       
    background: none;
    width: 0;
    margin-top: 5px;
    caret-color: transparent;
    line-height: 20px;
    transition: width 0.4s linear;
}

.search .search-input {
    padding: 0 10px;
    width: 100%;
    caret-color: #06B1FC;
    font-size: 16px;                
    font-weight: 300;
    color: black;
    font-family: 'Open Sans', sans-serif;
    transition: width 0.4s linear;
}

.search-icon {
  height: 50px;
  width: 50px;  
  float: right;
  display: flex;
  margin-right:-11px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #06B1FC;  
  font-size: 18px;
  bottom: 37.5px;
  position: relative;
  text-decoration:none;
  border-radius: 0px;
}

.search-icon:hover {
  color: #fff !important;
}
.card.pdg-card{
  padding:20px;
}
.card-counter{
  box-shadow: 2px 2px 10px #DADADA;
  margin: 5px;
  padding: 20px 10px;
  background-color: #fff;
  height: 100px;
  border-radius: 5px;
  transition: .3s linear all;
}

.card-counter:hover{
  box-shadow: 4px 4px 20px #DADADA;
  transition: .3s linear all;
}

.card-counter.primary{
  background-color: #007bff;
  color: #FFF;
}

  .card-counter.danger{
    background-color: #ea5d1f;
    color: #FFF;
  }  

  .card-counter.success{
    background-color: #66bb6a;
    color: #FFF;
  }  

  .card-counter.info{
    background-color: #e62835;
    color: #FFF;
  }  

  .card-counter i{
    font-size: 5em;
    opacity: 0.2;
  }

  .card-counter .count-numbers{
    position: absolute;
    right: 35px;
    top: 20px;
    font-size: 32px;
    display: block;
  }

  .card-counter .count-name{
    position: absolute;
    right: 35px;
    top: 65px;
    font-family:"Open Sans";
   
    opacity: 0.5;
    display: block;
    font-size: 18px;
  }
section.d-flex.justify-content-center{
  padding-bottom:1px;
}



.carouselItem img {
    width: 40%;
    height:100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:auto;
    margin-right:auto;	
    object-fit: cover;
}


.wrapper{
	width:50%;
	
	
}
.box {
  display: block;
  min-width: 300px;
  width:10px;
  height: 300px;
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  
}



.publier{
	background-color:white;
}


.container{
	padding-left: 8px !important;
	padding-right: 8px !important;
	
}


.annoncet{
	
	font-weight:bold;
	font-size:20px;
	color:black;
	padding-top:5px;
	
}
.annonced{
	
	font-size:18px;
	

}
a:not([href]) {
    
    text-decoration: none;
}
.annoncer{

	font-size:0.8em;
	color:black;
}.annoncecat{
	
	font-size:0.8em;
	color:black;
}.annoncedate{
	
	font-size:0.8em;
	float:right;
	color:black;
}

.search-sec{
    padding: 2rem;
}
.card.flex-row.flex-wrap {
overflow: auto;
margin:2px;
padding:5px;

height:auto;
width:100%;

border-radius:0px !important;
border-color:#bababa !important;

}

.search-slt{
    
    width: 100%;

    font-size: 0.875rem;
    line-height: 1.5;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    height: calc(3rem + 2px) !important;
    border-radius:0 !important;
} 
.btn{
	color:white !important;
	border-radius:0px !important;
  border-color:#f3b806;
  margin-bottom:-10px !important;
  margin-top:10px;
	
}
.btn-success{
	border-color: #00047a !important;
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
textarea[name=foo] {
  resize: none;
}

.form-control{
	border-radius:0px !important;
	
}

.wrn-btn{
  
    font-size: 16px !important;
    font-weight: 400;
    text-transform: uppercase;	
   
    border-radius:0 !important;
	background-color:#51A030 !important;
	border-color:#51A030 !important;
}

@media (min-width: 992px){
    .search-sec{
        position: relative;
        top: -250px;
        background: rgba(26, 70, 104, 0.51);
    }
}

@media (max-width: 992px){
    .search-sec{
        background: #1A4668;
    }
}

</style>
