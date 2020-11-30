<template>
  <GuideLayout>
    <div class="titleHead">
      <div class="homeBtn" @click="$router.push('/')">
        <div class="inner">
          <v-icon>mdi-home</v-icon>
          <span>처음으로</span>
        </div>
      </div>
      <dl>
          <dt>{{$route.meta.title}}</dt>
          <dd>{{$route.meta.subTitle}}</dd>
      </dl>
    </div>
    <div class="guideList">
      <div class="guideMenu">
        <div class="tip">
          매장 내 냉난방기는 세탁기 또는 건조기 사용시 자동으로 작동하고 있습니다. 쾌적한 공간에서
          여유있는 시간을 즐겨주세요
        </div>
        <div class="item" v-ripple @click="detail('join')">
          <div class="icon">
            <img src="@/assets/img/guide-icon01.png" />
          </div>
          <dl class="text">
            <dt>회원가입 후 충전하기</dt>
            <dd>핸드폰번호를 통하여 회원가입 및 포인트 적립이 이루어집니다</dd>
          </dl>
          <div class="arrow">
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
        <div class="item" v-ripple @click="detail('wash')">
          <div class="icon">
            <img src="@/assets/img/guide-icon02.png" />
          </div>
          <dl class="text">
            <dt>세탁기 사용방법</dt>
            <dd>키오스크를 이용한 세탁기 사용방법을 안내해드립니다</dd>
          </dl>
          <div class="arrow">
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
        <div class="item" v-ripple @click="detail('dry')">
          <div class="icon">
            <img src="@/assets/img/guide-icon03.png" />
          </div>
          <dl class="text">
            <dt>건조기 사용방법</dt>
            <dd>키오스크를 이용한 건조기 사용방법을 안내해드립니다</dd>
          </dl>
          <div class="arrow">
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </div>
      </div>
    </div>
  </GuideLayout>
</template>

<script>
import GuideLayout from '@/components/layout/GuideLayout.vue';

export default {
  components: {
    GuideLayout,
  },

  methods:{
    detail(type = 'join') {
      this.$router.push({ name: 'GuideView', params: { type } });
    },
  }
};
</script>

<style lang="scss" scoped>

.titleHead{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 240px;

  .homeBtn {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    margin-right: 30px;
    border:3px solid #a8a8a8;
    background: rgb(194,194,194);
    background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

    .inner{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:105px;
      width:105px;
      border-radius:50px;
      background: rgb(194,194,194);
      background: linear-gradient(180deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

      .v-icon {
        font-size: 45px;
      }

      span{
        font-size:20px;
        font-weight:bold;
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
      font-size:32px;
    }
  }
}

.guideList {
  position: relative;
  z-index: 99;

  .guideMenu {
    flex: 1;
    background: rgba(255, 255, 255, 0.5);
    padding: 50px;
    border-radius: 15px;
    overflow-y: scroll;
  }

  .tip {
    background: rgba(0, 0, 0, 0.7);
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 15px;
    font-size: 30px;
    color: #fff;
    word-break: keep-all;
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 15px;
    background: rgb(194, 194, 194);
    background: linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
    box-shadow: 10px 10px 30px rgba(255, 255, 255, 0.7);

    dl {
      flex: 1;
      margin: 0 30px;
      dt {
        font-weight: 500;
        font-size: 40px;
      }
      dd {
        font-size: 30px;
        line-height:44px;
        color: #595959;
        margin-top: 10px;
        word-break: keep-all;
        font-weight:500;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 210px;
      height: 210px;
    }
    .arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 210px;
      border-radius: 6px;
      .v-icon {
        font-size: 48px;
      }
    }
  }
}
</style>
