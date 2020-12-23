<template>
  <DefaultLayout ref="defaultLayout" @done="nextStep">
    <div class="detailView">
      <dl>
        <dt>회원정보</dt>
        <dd>
          <div class="item">
            <label>회원번호</label>
            <span>{{ user.phone }}</span>
          </div>
          <div class="item">
            <label>현재 포인트</label>
            <span>{{ user.point | numeral('0,0') }} P</span>
          </div>
        </dd>
      </dl>
      <dl v-if="type === 'Use'">
        <dt>상품정보</dt>
        <dd>
          <div class="item">
            <label>선택한 장비</label>
            <span>{{ this.selectedMachine.name }}</span>
          </div>
          <div class="item">
            <label>선택한 상품</label>
            <span>{{ this.selectedProduct.name }}</span>
          </div>
          <div class="item">
            <label>동작 시간</label>
            <span>{{ Math.floor(this.selectedProduct.runTimeSec / 60) }} 분</span>
          </div>
        </dd>
      </dl>
      <dl>
        <dt>결제정보</dt>
        <dd>
          <div class="item last">
            <label>결제 예정금액</label>
            <span v-if="type === 'Use'"
              >{{ parseInt(selectedProduct.price, 10) | numeral('0,0') }}원</span
            >
            <span v-if="type === 'Charge'"
              >{{ parseInt(userAction.price, 10) | numeral('0,0') }}원</span
            >
          </div>
          <div class="item" v-if="type === 'Charge'">
            <label>추가 포인트</label>
            <span
              >{{
                Math.floor(parseInt(userAction.price, 10) * userAction.rate) | numeral('0,0')
              }}
              P</span
            >
          </div>
          <div class="item" v-if="type === 'Charge'">
            <label>총 지급 포인트</label>
            <span
              >{{
                Math.floor(parseInt(userAction.price, 10) * (1 + userAction.rate)) | numeral('0,0')
              }}
              P</span
            >
          </div>
          <div class="divider" />
          <div class="item">
            <label>결제후 포인트</label>
            <span v-if="type === 'Use'"
              >{{
                (parseInt(user.point, 10) - parseInt(selectedProduct.price, 10)) | numeral('0,0')
              }}
              P</span
            >
            <span v-if="type === 'Charge'">{{ pointAfterPay | numeral('0,0') }} P</span>
          </div>
        </dd>
      </dl>

      <div class="guideText" v-if="type === 'Use'">
        <div class="text1">
          <v-icon size="70">mdi-exclamation-thick</v-icon>
          <span
            >키오스크에서 선택하신 <b>포인트</b>를 각 기기에서 이용하실 <b>금액</b>과
            <b>일치</b>시켜야 합니다.</span
          >
        </div>
        <div class="text2">※ 초과 결제된 금액은 반환해드리지 않습니다.</div>
      </div>
    </div>
    <CardModal ref="cardModal" :inputAmount="userAction.price" @onPay="pay($event)" />
    <CashModal ref="cashModal" :inputAmount="userAction.price" @onPay="pay($event)" />
    <ProgressModal ref="progressModal" message="잠시만 기다려주세요" />
    <ErrorModal ref="errorModal" :message="errorMsg" />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import CardModal from '@/components/modal/CardModal.vue';
import CashModal from '@/components/modal/CashModal.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Detail',
  components: {
    DefaultLayout,
    CardModal,
    CashModal,
  },
  props: {
    type: String,
  },
  data() {
    return {
      errorMsg: '',
    };
  },
  mounted() {
    this.$refs.defaultLayout.setNext(true);
  },
  computed: {
    ...mapState({
      user: state => state.user,
      userAction: state => state.userAction,
      productId: state => state.runAction.productId,
      machines: state => state.machines,
    }),
    pointAfterPay() {
      if (this.type === 'Charge') {
        const { price, rate } = this.userAction;
        const { point } = this.user;

        return Math.floor(parseInt(price, 10) * (1 + parseFloat(rate))) + parseInt(point, 10);
      }
      return 0;
    },
    selectedMachine() {
      return this.machines.find(machine => {
        return machine.services.find(service => {
          return this.productId === service.id;
        });
      });
    },
    selectedProduct() {
      return this.selectedMachine.services.find(service => {
        return service.id === this.productId;
      });
    },
  },
  methods: {
    ...mapMutations({
      appendAction: 'APPEND_ACTION',
      appendUser: 'APPEND_USER',
    }),
    ...mapActions({
      chargePoint: 'chargePoint',
      run: 'runMachine',
    }),
    nextStep() {
      if (this.type === 'Charge') this.payment();
      else if (this.type === 'Use') this.runMachine();
    },
    payment() {
      // 결제하기
      if (this.userAction.method === 'cash') this.$refs.cashModal.show(true);
      else if (this.userAction.method === 'card') this.$refs.cardModal.show(true);
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async pay(price) {
      this.$refs.progressModal.show(true);
      await this.delay(2000);
      this.appendAction({ price });
      const res = await this.chargePoint();
      // console.log(res);
      if (res.status === 200) {
        const point = res.data.havePoint;
        this.appendUser({ point });
      }
      this.$refs.progressModal.show(false);
      this.$router.push({ name: 'Finish', params: { type: this.type } });
    },
    async runMachine() {
      this.$refs.progressModal.show(true);
      await this.delay(2000);
      this.run()
        .then(res => {
          // console.log(res);
          const point = res.data.point;
          // this.appendUser({ point: parseInt(point) });
          this.appendUser({ point });
          // this.$refs.progressModal.show(false);
          this.$router.push({ name: 'Finish', params: { type: this.type } });
        })
        .catch(error => {
          // 405 = 장비통신불가능
          // 406 = 장비통신불가능
          // 401 = 회원의포인트가 부족
          if (error.response.status === 401) {
            // this.$refs.progressModal.show(false);
            this.errorMsg = '보유하신 포인트가 부족합니다';
            this.$refs.errorModal.show(true);
          } else {
            // console.log(error.response);
            // this.$refs.progressModal.show(false);
            this.errorMsg = '장비와의 통신이 원활하지 않습니다';
            this.$refs.errorModal.show(true);
          }
        })
        .finally(() => {
          this.$refs.progressModal.show(false);
        });
      // console.log('res', res);
      // if(res.status === 200) {
      //   const point = res.data.point;
      //   this.appendUser({ point });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.detailView {
  dl {
    margin-bottom: 30px;
    border-radius: 15px;
    overflow: hidden;

    dt {
      text-align: center;
      background: #f2f2f2;
      padding: 15px 0;
      border-bottom: 3px solid #e2e2e2;
    }
    dd {
      padding: 30px;
      background: #fff;

      div.item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        label {
          font-size: 30px;
          color: #888;
        }
      }

      div.item:last-child {
        margin-bottom: 0px;
      }

      div.item.last {
        span {
          color: #d22828;
        }
      }
    }
  }

  .guideText {
    text-align: center;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 30px;
    padding: 30px;

    .text1 {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .v-icon {
        width: 100px;
        color: yellow;
        margin-right: 10px;
      }
      span {
        flex: 1;
        color: #fff;
        text-align: left;
        display: block;
        word-break: keep-all;

        b {
          color: yellow;
          font-weight: normal;
        }
      }
    }

    .text2 {
      display: inline-block;
      height: 80px;
      line-height: 80px;
      padding: 0 45px;
      border-radius: 45px;
      text-align: center;
      background: #d22828;
      color: #fff;
      font-size: 32px;
    }
  }
}

.divider {
  height: 3px;
  background: #e2e2e2;
  margin: 30px 0;
}
</style>
