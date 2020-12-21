<template>
  <div class="default">
    <div class="article">
      <div class="titleHead">
        <div class="homeBtn" @click="$router.replace({ name: 'Home' })">
          <div class="inner">
            <v-icon>mdi-home</v-icon>
            <span>처음으로</span>
          </div>
        </div>
        <dl>
          <dt>{{ $route.meta.title }}</dt>
          <dd>{{ $route.meta.subTitle }}</dd>
        </dl>
      </div>
      <div class="section">
        <slot />
      </div>

      <div class="bottomBtns">
        <div class="boldBtn" style="margin-right:10px;" v-ripple @click="goBack">
          <v-icon>mdi-chevron-left</v-icon>
          <span>뒤로</span>
        </div>
        <div class="boldBtn" :class="{ nextBtn: nextActive }" style="margin-left:10px;" v-ripple @click="$emit('done')">
          <svg v-if="nextActive">
            <rect v-if="nextActive"></rect>
          </svg>
          <span v-if="$route.name === 'Detail'">결제진행</span>
          <span v-if="$route.name !== 'Detail'">다음</span>
          <v-icon>mdi-chevron-right</v-icon>
        </div>
      </div>
    </div>
    <Waves />
    <!-- <WavesBlue /> -->
  </div>
</template>

<script>
import Waves from '@/components/Waves';
import { mapState } from 'vuex';
// import WavesBlue from '@/components/WavesBlue.vue';
export default {
  name: 'DefaultLayout',
  data() {
    return {
      nextActive: false,
    };
  },
  components: {
    Waves,
    // WavesBlue,
  },
  computed: {
    ...mapState({
      hideNoticePage: state => state.kiosk.Options.hideNoticePage,
    }),
  },
  methods: {
    goBack() {
      if((this.$route.name === 'Point' && this.hideNoticePage) ||
         (this.$route.name === 'Product' && this.hideNoticePage)) {
        this.$router.replace({ name: 'Home' });
      } else {
        this.$router.go(-1);
      }
    },
    setNext(value) {
      this.nextActive = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.default {
  height: 100%;
  .article {
    position: relative;
    z-index: 99;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 60px;
    .section {
      flex: 1;
    }
  }
}
.titleHead {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 240px;
  .homeBtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    margin-right: 30px;
    border: 3px solid #a8a8a8;
    background: rgb(194, 194, 194);
    background: linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
    .inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 105px;
      width: 105px;
      border-radius: 50px;
      background: rgb(194, 194, 194);
      background: linear-gradient(180deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
      .v-icon {
        font-size: 45px;
      }
      span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  dl {
    dt {
      font-size: 48px;
      color: #fff;
      font-weight: 500;
    }
    dd {
      color: #fff;
      font-size: 32px;
    }
  }
}
.bottomBtns {
  position: relative;
  z-index: 99;
  display: Flex;
  padding: 60px 0;

  .boldBtn {
    display: flex;
    align-items: center;
    flex: 1;
    font-size: 36px;
    height: 100px;
    padding: 0 20px;
    border-radius: 15px;
    border: 3px solid #e2e2e2;
    background: rgb(194, 194, 194);
    background: linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
    box-shadow: 10px 10px 20px rgba(0, 158, 230, 0.35);
    span {
      flex: 1;
      text-align: center;
    }
    .v-icon {
      font-size: 42px;
    }
  }

  // .nextBtn{
  //   animation: pointBtn .7s infinite; 
  // }

  // @keyframes pointBtn {
  //   0%{border:3px solid #e2e2e2}
  //   50%{border:3px solid rgba(255, 0, 170, 1)}
  //   100%{border:3px solid #e2e2e2}
  // }
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
      stroke:#ff0080;
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
