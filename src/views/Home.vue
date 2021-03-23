<template>
  <div class="home">
    <v-carousel
      height="1920"
      hide-delimiters
      :show-arrows-on-hover="false"
      :show-arrows="false"
      :cycle="true"
      interval="5000"
    >
      <!-- <v-carousel-item>
        <img src="http://admin.payot-coin.com/kiosk/sb01.png">
      </v-carousel-item>
      <v-carousel-item>
        <img src="http://admin.payot-coin.com/kiosk/sb02.png">
      </v-carousel-item> -->
      <v-carousel-item v-for="item in slides" :key="item.id">
          <img :src="`http://admin.payot-coin.com/kiosk/5.0.0/${item.url}`">
      </v-carousel-item>
    </v-carousel>

    <div class="btns">
      <div class="boldCircleBtn join" @click="nextStep(action[0])">
        <div class="inner">
          <v-icon>mdi-exclamation-thick</v-icon>
          <span>회원가입</span>
        </div>
      </div>
      <div class="boldCircleBtn login" @click="nextStep(action[1])">
        <div class="inner">
          <label>Log-in</label>
          <span>로그인</span>
        </div>
      </div>
      <div class="boldCircleBtn guide" @click="nextStep(action[2])">
        <div class="inner">
          <v-icon>mdi-help</v-icon>
          <span>이용안내</span>
        </div>
      </div>
    </div>
    <div class="logo" @click="logoutCount++">
      <img src="@/assets/img/logo.png">
    </div>
    <WavesBlue />
  </div>
</template>

<script>
import WavesBlue from '@/components/WavesBlue';
import { mapState } from 'vuex';
export default {
  name: 'Home',
  components: {
    WavesBlue,
  },
  data() {
    return {
      slides:[
        {url:'main-sb-01.png'},
        {url:'main-sb-02.png'},
        {url:'main-sb-03.png'},
        {url:'main-sb-04.png'},
        {url:'main-sb-05.png'},
        {url:'main-sb-06.png'},
        {url:'main-sb-07.png'}
      ],
      action: [
        { name: 'Phone', redirectRouteName: 'PointGuide', mode: 'Charge' },
        { name: 'Phone', redirectRouteName: 'OrderGuide', mode: 'Use' },
        { name: 'GuideList', redirectRouteName: null, mode: null },
      ],
      logoutCount: 0,
    };
  },
  computed: {
    ...mapState({
      hideNoticePage: state => state.kiosk.Options.hideNoticePage,
    }),
  },
  // watch: {
  //   logoutCount(newValue) {
      // if(newValue === 15) this.$router.push({ name: 'AdminLogin' });
      // if(newValue >= 15) this.$emit('logoutPossible');
      // else this.$emit('logoutImpossible');
  //   },
  // },
  mounted() {
    this.$store.commit('CLEAR_ACTION');
  },
  methods: {
    nextStep({ name, redirectRouteName, mode }) {
      if(name === 'GuideList') this.$router.push({ name });
      else {
        if(this.$store.state.kiosk.Options && this.hideNoticePage) {
          if(mode === 'Charge') redirectRouteName = 'Point';
          else if(mode === 'Use') redirectRouteName = 'Product';
        }
        this.$router.push({
          name,
          params: {
            mode,
            done: () => this.$router.push({ name: redirectRouteName }),
          },
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.home{
  flex:1;
  .btns{
    position:absolute;
    width:100%;
    bottom:180px;
    text-align: center;
    z-index:3;
    display:flex;
    justify-content: center;
    align-items: center;
    .boldCircleBtn{
      display:flex;
      align-items: center;
      justify-content: center;
      border:3px solid #a8a8a8;
      border-radius:100%;
      background: rgb(194,194,194);
      background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
      padding:15px;
      box-shadow: 10px 10px 30px rgba(255,255,255,0.6);
      .inner{
        flex:1;
        height:100%;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius:100%;
        background: rgb(194,194,194);
        background: linear-gradient(180deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
      }
    }
    .login{
      width:320px;
      height:320px;
      margin:0 40px;
      .inner{
        label{
          font-family:'Roboto';
          font-size:62px;
          line-height:62px;
          font-weight:bold;
        }
        span{
          font-size:42px;
          margin-top:5px;
          font-weight:bold;
        }
      }
    }
    .join, .guide{
      width:240px;
      height:240px;
      .inner{
        .v-icon{font-size:60px;}
        span{
          font-size:26px;
          font-weight:bold;
          margin-top:10px;
        }
      }
    }
    .join{
      .inner{
        .v-icon{color:#f55c8a}
      }
    }
  }
  .logo{
    padding:60px 0;
    width:100%;
    text-align:center;
    z-index: 3;
    position:absolute;
    bottom:0px;
    img{
      height:50px;
    }
  }
}
</style>