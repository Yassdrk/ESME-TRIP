<template>
  <div class="Slider">
    <div id="section">
    <h2>NOS MEILLEURES DESTINATIONS</h2>
    <div id="cards_landscape_wrap-2">
    <div class="container">
    <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
    <div class="card-flyer">
    <div class="text-box">
    <div class="image-box">
    <img src="https://milesopedia.com/wp-content/uploads/2020/11/oasis.oman-13-768x410.jpg" alt="" />
    </div>
    <div class="text-container">
    <h6>Oman</h6>
    <p>Oman se compose d'un désert, d'oasis dans le lit de rivières et de longs littoraux sur le golfe Persique (ou golfe Arabique), la mer d’Arabie et le golfe d'Oman.</p>
	<button type="button" class="btn btn-dark bg-warning "><router-link :to="`/voyage/3`" style="color:white">Réserver</router-link></button>
	</div>
    </div>
    </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
    <div class="card-flyer">
    <div class="text-box">
    <div class="image-box">
    <img src="https://teli.asso.fr/photos/contenus/zooms/ice_1765_fr.png" alt="" />
    </div>
    <div class="text-container">                                    
    <h6>Islande</h6>
    <p>L'Islande est un pays insulaire nordique aux paysages spectaculaires composés de volcans, geysers, sources chaudes et champs de lave. </p>
    <button type="button" class="btn btn-dark bg-warning"><router-link :to="`/voyage/6`" style="color:white">Réserver</router-link></button>
    </div>
    </div>
    </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
    <div class="card-flyer">
    <div class="text-box">
    <div class="image-box">
    <img src="https://www.mexique-voyages.com/wp-content/uploads/voyage-mexique-agence-terra-maya-e1578696459556.jpg" alt="" />
    </div>
    <div class="text-container">
    <h6>Mexique</h6>
    <p>Le Mexique est un pays réputé pour ses plages du Pacifique et du golfe du Mexique, ainsi que pour ses paysages variés - entre montagnes, déserts et jungles.</p>
    <button type="button" class="btn btn-dark bg-warning"><router-link :to="`/voyage/4`" style="color:white">Réserver</router-link></button>
    </div>
    </div>
    </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
    <div class="card-flyer">
    <div class="text-box">
    <div class="image-box">
    <img src="https://www.destinationcocktails.fr/wp-content/uploads/2019/11/Japon.jpg" alt="" />
    </div>
    <div class="text-container">
    <h6>Japon</h6>
    <p>Le Japon est un pays insulaire situé dans l'océan Pacifique. Il comporte des villes denses, des palais impériaux et des parcs nationaux montagneux.</p>
    <button type="button" class="btn btn-dark bg-warning"><router-link :to="`/voyage/5`" style="color:white">Réserver</router-link></button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Slider'
}
</script>
