<template>
  <div class="phoneView fill-height">
    <div class="inner">
      <div class="box numberView">
        <div class="text">
          <span @click="$refs.agree.open('info')">이용약관</span>과 <span @click="$refs.agree.open('user')">개인정보취급방침</span>에 동의하시면 휴대전화번호를 입력 후 아래 다음버튼을
          터치해주세요
        </div>
        <div class="divider" />
        <div class="number">
          {{ phoneNumber }}
        </div>
      </div>
      <div class="box numberPad">
        <div class="row" v-for="(numbers, rowIndex) in numberPad" :key="rowIndex">
          <v-btn text v-for="(number, columIndex) in numbers" :key="columIndex" @click="inputButton(number)">{{
            number
          }}</v-btn>
          <!-- <v-btn text>3</v-btn> -->
        </div>
        <div class="row">
          <v-btn text class="replace" @click="inputButton('clear')">초기화</v-btn>
          <v-btn text @click="inputButton(0)">0</v-btn>
          <v-btn text @click="inputButton('delete')"><v-icon>mdi-arrow-left</v-icon></v-btn>
        </div>
      </div>
    </div>

    <Agree ref="agree"/> 
  </div>  
</template>

<script>
import Agree from '@/components/Phone/Agree.vue';

export default {
  name: 'PhoneNumberPanel',
  components: {
    Agree,
  },
  data() {
    return {
      phone: '010',
      numberPad: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };
  },
  computed: {
    phoneNumber(){
      const firstNumber = this.phone.slice(0, 3);
      const middleNumber = this.phone.slice(3, 7);
      const lastNumber = this.phone.slice(7, 11);
      const totalNumber = [firstNumber, middleNumber, lastNumber]
        .filter(n => n)
        .join('-');
      return totalNumber;
    },
  },
  watch:{
    phoneNumber(newValue){
      this.$emit('phone', newValue);
    },
  },
  methods: {
    inputButton(key) {
      if(key === 'clear') this.phone = '010';
      else if(key === 'delete' && this.phone.length > 3)  this.phone = this.phone.slice(0, this.phone.length - 1);
      else if(typeof key === 'number' && this.phone.length < 11) this.phone += key;
    },
  },
}
</script>

<style lang="scss" scoped>
.phoneView {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 120px;
    background: rgba(255, 255, 255, 0.3);
    border:4.5px solid rgba(255,255,255,0.3);
    margin-bottom: 30px;
    border-radius: 15px;
    .inner{
      background:#fff;
      border-radius:30px;
      padding:60px;
      box-shadow: 15px 15px 30px rgba(0,0,0,0.1);
    }
    .numberView {
      margin-bottom: 30px;
      .text {
        text-align: center;
        word-break: keep-all;
        font-size: 33px;
      }
      .divider {
        margin: 50px 0;
        height: 3px;
        background: #e2e2e2;
      }
      .number {
        font-size: 55px;
        font-weight: 500;
        text-align: center;
        vertical-align: center;
      }
    }
    .numberPad {
      display: flex;
      flex-direction: column;
      flex: 1;
      background: #fff;
      .row {
        display: flex;
        flex: 1;
        margin: 6px 0;
        .v-btn {
          flex: 1;
          height: 100%;
          min-height:100px;
          font-size: 42px;
          background: #fff;
          margin: 2px 8px;
          border-radius: 15px;
          border:3px solid #d2d2d2;
          background: rgb(194,194,194);
          background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
        }
        .v-icon {
          font-size: 48px;
        }
        .replace {
          font-size: 36px;
        }
      }
    }
  }
</style>