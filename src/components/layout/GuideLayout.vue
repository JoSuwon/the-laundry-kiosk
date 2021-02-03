<template>
  <div class="guideLayout">
    <div class="article">
      <div class="section">
        <slot></slot>
      </div>
      <div class="btns">
        <div class="homeBtn btn" @click="$router.replace({ name: 'Home' })">
          <v-icon>mdi-home</v-icon>
          <span>처음으로</span>
        </div>
        <div class="backBtn btn" @click="$router.go(-1)">
          뒤로가기
        </div>
      </div>
    </div>
    <Waves />
  </div>
</template>

<script>
import Waves from '@/components/Waves';

export default {
  components:{
    Waves
  }
}
</script>

<style lang="scss" scoped>
.guideLayout{
  height:100%;

  .article{
    position: relative;
    z-index:99;
    display:flex;
    flex-direction: column;
    height:100%;
    padding: 0 60px;

    .section{
      flex:1;
    }
  }

  .btns{
    position:relative;
    z-index:2;
    display:flex;
    padding:60px 0;
    
    .btn{
      display:flex;
      justify-content: center;
      align-items: center;
      height:120px;
      border-radius:15px;
      background: rgb(194,194,194);
      background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
      border:2px solid #d2d2d2;
      box-shadow: 10px 10px 20px rgba(177, 38, 36, 0.35);
    }

    .homeBtn{
      flex-direction: column;
      width:150px;
      .v-icon{font-size:46px;}
      span{font-size:22px;}

    }

    .backBtn{
      flex:1;
      margin-left:30px;
      font-size:42px;
    }
  }
}
</style>