<template>
  <div class="orderGuide">
    <v-dialog 
      v-model="visible" 
      fullscreen
      transition="slide-x-transition"
    >
      <div class="guideCheck">
        <h2>꼭! 확인하세요</h2>
        <div class="checkImg">
          <img src="/image/wash-check.png">
        </div>
        <div class="checkText">
          <dl>
            <dt>1. 세탁물을 넣은 후 세탁기 도어를 잠그셨나요?</dt>
            <dd>※ 잠기지 않은 상태에서는 결제가 정상처리 되지 않을 수 있습니다.</dd>
          </dl>
          <dl>
            <dt>2. 기기의 <b>유닛(번호)</b> 및 선택하신 코스의 <b>요금</b>과 <b>결제금액</b>을 <b>일치</b>시켜주세요</dt>
          </dl>
        </div>
        <div class="btns">
          <v-btn text @click="$router.push('Product')">예</v-btn>
          <v-btn text @click="visible=false">아니오</v-btn>
        </div>
      </div>
    </v-dialog>

    <div class="guideImg">
      <img src="/image/wash-guide.png" />
    </div>
    <div class="bottomBtns">
      <div class="boldBtn" style="margin-right:10px;" v-ripple @click="$router.replace({ name: 'Home' })">
        <v-icon>mdi-chevron-left</v-icon>
        <span>뒤로</span>
      </div>
      <div class="boldBtn" style="margin-left:10px;" v-ripple @click="visible=true">
        <span>다음</span>
        <v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.orderGuide {
  display:flex;
  flex: 1;
  height: 100%;
  background: #fff;

  .guideImg {
    width: 100%;
    background: #f2f2f2;
    height: 100%;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }
  }

  .bottomBtns {
    position: absolute;
    width: 100%;
    bottom: 60px;
    left: 0px;
    z-index: 99;
    display: Flex;
    padding: 0px 60px;

    .boldBtn {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 36px;
      height: 100px;
      padding: 0 20px;
      border: 3px solid #e2e2e2;
      border-bottom: 0px;
      border-right: 0px;
      background: rgb(194, 194, 194);
      background: linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
      border-radius: 15px;
      box-shadow: 10px 10px 20px rgba(0, 158, 230, 0.35);

      span {
        flex: 1;
        text-align: center;
      }
      .v-icon {
        font-size: 42px;
      }
    }
  }
}

.guideCheck {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height:100%;
  font-family:'NotoSansKR';
  font-size:36px;
  padding:60px;
  border-radius:15px;
  background:rgba(0,0,0,0.8);

  h2{
    text-align:center;
    color:#fff;
    margin-bottom:30px;
    font-size:72px;
    font-weight:600;
  }

  .checkImg{
    border-radius:30px;
    overflow:hidden;
    img{display:block;}
  }

  .checkText{
    margin-top:60px;
    padding:0 60px;
    dl{
      margin-bottom:30px;
      dt{
        color:#fff;
        font-size:42px;
        word-break: keep-all;

        b{color:yellow;font-weight:400;}
      }
      dd{
        color:yellow;
        font-size:33px;
        word-break: keep-all;
      }
    }
  }

  .btns{
    margin-top:60px;
    text-align:center;
    .v-btn{
      width:300px;
      margin:0 15px;
      min-height:90px;
      border: 3px solid #e2e2e2;
      border-bottom: 0px;
      border-right: 0px;
      background: rgb(194, 194, 194);
      background: linear-gradient(0deg, rgba(194, 194, 194, 1) 0%, rgba(255, 255, 255, 1) 100%);
      border-radius: 15px;
      box-shadow: 10px 10px 20px rgba(0, 158, 230, 0.35);
      font-size:36px;
    }
  }
}
</style>
