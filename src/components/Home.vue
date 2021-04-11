<template>

  <div id="app">
<Header/>
<Slider/>
<Footer/>

    </div>
</template>

<script>
import Header from './Header'
import Slider from './Slider'
import Footer from './Footer'


export default {
  name: 'Home',
  components:{
    Header,
    Slider,
    Footer
  }
}
</script>


<style>

</style>