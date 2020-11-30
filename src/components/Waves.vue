<template>
    <!--Waves Container-->
    <div class="waves">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
    </div>
    <!--Waves end-->
</template>

<style lang="scss" scoped>
.waves {
  position:fixed;
  bottom:0;
  z-index:1;
  width:100%;
  .wave{
    position:absolute;
    border-radius: 42.6%;    
  }
  .wave1{
    bottom:-1500px;
    left:-900px;
    width:1800px;
    height:1800px;
    opacity: 0.4;
    animation: move-forever 20s infinite linear;
    background:#fff;
  }
  .wave2{
    bottom:-1600px;
    right:-900px;
    width:2000px;
    height:2000px;
    opacity: 0.6;
    animation: move-forever 20s infinite linear;
    background:#fff;
  }
  .wave3{
    bottom:-2200px;
    left:-740px;
    width:2500px;
    height:2500px;
    opacity: 1;
    animation: move-forever 24s infinite linear;
    background:#fff;
	}
	
	/* Animation */
	@keyframes move-forever {
		0% {
		transform: rotate(0deg);
		}
		100% { 
			transform: rotate(360deg);
		}
	}
}
</style>