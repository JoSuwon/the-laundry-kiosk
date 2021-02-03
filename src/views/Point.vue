<template>
  <DefaultLayout
    ref="defaultLayout"
    @done="nextStep"
  >
    <div class="myState">
      <dl class="myPhone">
        <dt>나의 전화번호</dt>
        <dd>010-****-{{ user.phone.split('-')[2] }}</dd>
      </dl>
      <dl class="myPoint">
        <dt>보유 포인트</dt>
        <dd>{{ user.point | numeral('0,0') }} P</dd>
      </dl>
    </div>
    <div class="point-list">
      <v-row>
        <v-col cols="6" v-for="(item, index) in chargeItem" :key="index" >
          <div class="item" :class="{ active: focusItemIndex === index }" @click="focusItemIndex = index">
            <dl class="first">
              <dt>
                충전
              </dt>
              <dd>
                <strong>{{ item | numeral('0,0') }}</strong>원
              </dd>
            </dl>
            <div class="divider" />
            <dl>
              <dt>카드 추가적립({{ Math.floor(eventRate.card * 100) }}%)</dt>
              <dd>{{ Math.floor(item * eventRate.card) | numeral('0,0') }} P</dd>
            </dl>
            <dl>
              <dt>현금 추가적립({{ Math.floor(eventRate.cash * 100) }}%)</dt>
              <dd>{{ Math.floor(item * eventRate.cash) | numeral('0,0') }} P</dd>
            </dl>
          </div>
        </v-col>
      </v-row>
    </div>
    <ErrorModal 
      ref="errorModal"
      message="충전하실 금액을 선택해주세요"
    />
  </DefaultLayout>

</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { mapState } from 'vuex';

export default {
  name: 'Point',
  components: {
    DefaultLayout,
  },
  data() {
    return {
      focusItemIndex: -1,
      chargeItem: [1000, 2000, 5000, 10000, 20000, 30000, 40000, 50000],
    };
  },
  watch: {
    focusItemIndex(newValue) {
      if(newValue !== -1) {
        this.$refs.defaultLayout.setNext(true);
      } else {
        this.$refs.defaultLayout.setNext(false);
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      eventRate: state => state.kiosk.EventRate,
    }),
  },
  methods: {
    nextStep() {
      if(this.focusItemIndex === -1) this.$refs.errorModal.show(true);
      else {
        this.$store.commit('APPEND_ACTION', { price: this.chargeItem[this.focusItemIndex] });
        this.$router.push({ name: 'Credit' });
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.myState{
  height:150px;
  background:#fff;
  border-radius:15px;
  display:flex;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  margin-bottom:30px;
 
  dl{
    flex:1;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    dt{font-size:30px;color:#888}
    dd{margin-top:6px;}
  }

  .myPhone{
    border-right:3px solid #e2e2e2    
  }
  .myPoint{
    dd{
      color:#c4342c;
    }
  }
}


.point-list{
  flex:1;
  max-height:1175px;
  background:rgba(255,255,255,1);
  border-radius:15px;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  overflow-y:hidden;
  padding:30px;

  .divider{
    height:3px;
    background:#e2e2e2;
    margin:20px 0;
  }

  .item{
    padding:30px;
    border-radius:15px;
    border:2px solid #c2c2c2;
    box-shadow: 8px 8px 15px rgba(177, 38, 36, 0.6);
    background: rgb(194,194,194);
    background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
    
    dl{
      display:flex;
      justify-content: space-between;
      align-items: center;
      font-size:26px;

      dt{color:#595959}
      dd{color:#c4342c}
    }

    dl.first{
      font-size:36px;

      dt{
        padding:10px 30px;
        background: #fff;
        border-radius:15px;
        font-size:30px;
        
      }

      dd{
        color:#292929;
        strong{
          color:#d22828;
          font-size:42px;
          margin-right:10px;
        }
      }
    }
    dl:last-child{margin-top:6px;}
  }

  .item.active{
    border:3px solid #d22828;
    dl.first{
      dt{background:#d22828;color:#fff;}
    }
  }

}

</style>
