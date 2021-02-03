<template>
  <div class="orderGuide">
    <div class="guideImg">
      <img src="http://admin.payot-coin.com/kiosk/5.0.0/point-guide.png"/>
    </div>
    <div class="bottomBtns">
      <div class="boldBtn" style="margin-right:10px;" v-ripple @click="$router.replace({ name: 'Home' })">
        <v-icon>mdi-chevron-left</v-icon>
        <span>뒤로</span>
      </div>
      <div class="boldBtn nextBtn" style="margin-left:10px;" v-ripple @click="$router.push('Point')">
        <svg>
          <rect></rect>
        </svg>
        <span>다음</span>
        <v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.orderGuide{
  flex:1;
  height:100%;
  background:#fff;

  .guideImg{
    width:100%;
    background:#f2f2f2;
    height:100%;
    overflow:hidden;

    img{
      display:block;
      width:100%;
    }
  }

  .bottomBtns{
    position: absolute;
    width:100%;
    bottom:60px;
    left:0px;
    z-index:99;
    display:Flex;
    padding:0px 60px;

    .boldBtn{
      display:flex;
      align-items: center;
      flex:1;
      font-size:36px;
      height:100px;
      padding:0 20px;
      border:3px solid #e2e2e2;
      border-bottom:0px;
      border-right:0px;
      background: rgb(194,194,194);
      background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
      border-radius:15px;
      box-shadow: 10px 10px 20px rgba(0,158,230,0.35);

      span{flex:1;text-align: center;}
      .v-icon{font-size:42px;}
    }
  }
  .nextBtn{
    position: relative;

    svg{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      fill: transparent;
    }

    rect{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      stroke:#d6595b;
      stroke-width: 6;
      fill: transparent;
      animation: nextBtn-ani 3s linear infinite ;
    }

    @keyframes nextBtn-ani {
      0%{
        stroke-dasharray: 220 100%;
        stroke-dashoffset: 40;
      }

      100%{
        stroke-dasharray: 220 100%;
        stroke-dashoffset: 600;
      }
    } 
  }
  
}



</style>