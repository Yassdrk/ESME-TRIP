<template>
  <div class="NotFound">
    <center>
<i id="err-icon" class="fa fa-exclamation-circle" style="color:#202857"></i></center>
<h1 style="font-family:'Poppins', sans-serif;text-align:center; color:black">404 NOT FOUND</h1>
<p style="text-align:center;margin-bottom:100px;font-family:'Poppins',sans-serif;color:black;">LA PAGE DEMANDÉE N'EST MALHEUREUSEMENT PAS DISPONIBLE.<br> VEUILLEZ EFFECTUER UNE AUTRE RECHERCHE.</p>
<Footer/>
    </div>
</template>

<script>
import Footer from './Footer'

export default {
  name: 'NotFound',
  components:{
      Footer
  }
}
</script>


<style scoped>



h1{
  margin-top: 30px;
  color: #ffffff;
}
#err-icon{
  font-size: 80pt;
  color: #ffffff;
  margin-top: 150px;
  -webkit-transition: 0.5s;
}
#err-icon:hover{
  -webkit-transform: scale(1.1);
  color: #202857;
  text-shadow: 0px 3px 0px rgb(0, 0, 0);
}
p{
  font-weight: bold;
}

</style>