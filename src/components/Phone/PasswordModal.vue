<template>
  <v-dialog v-model="visible" width="560" overlay-opacity="0.8" transition="slide-x-transition">
    <div class="dialog">
      <div class="password-pad">
        <div 
          class="pad-header" 
          :class="{ 
            'check-pass': type === 'check', 
            'register-pass': type === 'register', 
            'repeat-pass': type === 'repeat', 
            'check-temp-pass': type === 'checkTemp', 
            'update-pass': type === 'update'
          }"
        >
          <div class="pad-title">
            {{ title }}
          </div>
          <v-btn icon @click="closeModal"><v-icon>mdi-close</v-icon></v-btn>
          <div class="numberView">
            <div v-for="num in 4" :key="num" class="number" :class="{ active: password.length >= num }"></div>
          </div>
          <div class="tip">
            {{ message }}
          </div>
        </div>
        <div class="numberPad">
          <div class="row" v-for="(numbers, rowIndex) in numberPad" :key="rowIndex">
            <v-btn text v-for="number in numbers" :key="number" @click="inputButton(number)">{{ number }}</v-btn>
          </div>
          <div class="row">
            <v-btn text class="replace" @click="inputButton('clear')">초기화</v-btn>
            <v-btn text @click="inputButton(0)">0</v-btn>
            <v-btn text @click="inputButton('delete')"><v-icon>mdi-arrow-left</v-icon></v-btn>
          </div>
          <div class="pwFind">
            <v-btn text @click="$refs.confirmModal.show(true)">
              <v-icon>mdi-lock</v-icon>
              <span>비밀번호 찾기</span>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <ConfirmModal ref="confirmModal" @confirmOkay="findPw">
      임시 비밀번호를 문자메세지로 전송합니다
    </ConfirmModal>
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';

export default {
  name: 'PasswordModal',
  props: {
    type: { // check, register, repeat
      type: String,
      default: 'check',
    },
  },
  data() {
    return {
      password: '',
      numberPad: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    };
  },
  mixins: [ModalMixin],
  watch: {
    password(newValue) {
      this.$emit('password', newValue);
    },
  },
  computed: {
    title() {
      let str = '';
      if(this.type === 'check') str = '비밀번호 입력';
      else if(this.type === 'register') str = '비밀번호 생성';
      else if(this.type === 'repeat') str = '비밀번호 확인';
      else if(this.type === 'checkTemp') str = '임시비밀번호 입력';
      else if(this.type === 'update') str = '새 비밀번호 설정';
      return str;
    },
    message() {
      let str = '';
      if(this.type === 'check') str = '비밀번호를 입력해주세요';
      else if(this.type === 'register') str = '생성하실 비밀번호를 입력해주세요';
      else if(this.type === 'repeat') str = '생성하신 비밀번호를 입력해주세요';
      else if(this.type === 'checkTemp') str= '발송된 임시비밀번호를 입력해주세요';
      else if(this.type === 'update') str = '새로 설정할 비밀번호를 입력해주세요';
      return str;
    },
  },
  methods: {
    inputButton(key) {
      if(key === 'clear') this.password = '';
      else if(key === 'delete' && this.password.length > 0) this.password = this.password.slice(0, this.password.length-1);
      else if(typeof key === 'number' && this.password.length < 4) this.password += key;
    },
    closeModal() {
      this.show(false);
    },
    findPw() {
      this.$emit('findPw');
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .password-pad {
    width: 560px;
    position: absolute;
    bottom: 240px;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;

    // 기본 비밀번호 입력 #00a0e9
    // 비밀번호 등록 #431cb3
    // 비밀번호 확인 #1f9103

    .check-pass {
      background: #B12725;
    }
    .register-pass {
      background: #da2a24;
    }
    .repeat-pass {
      background: #FF776E;
    }
    .check-temp-pass {
      background: #da2a24;
    }
    .update-pass {
      background: #FF776E;
    }

    .pad-header {
      position: relative;
      padding: 30px;

      .pad-title {
        color: #fff;
        font-family: 'NotoSansKR';
        font-weight: 400;
        font-size: 30px;
        letter-spacing: -0.7px;
        margin-bottom: 30px;
      }

      .v-btn {
        position: absolute;
        right: 30px;
        top: 30px;
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.3);

        .v-icon {
          font-size: 36px;
          color: #fff;
        }
      }

      .numberView {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 45px 0;

        .number {
          margin: 0 15px;
          width: 45px;
          height: 45px;
          border-radius: 30px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 27px;
          font-weight: 500;
          font-family: 'NotoSansKR';
          color: #292929;
        }
        .number.active {
          background: #292929;
        }
      }

      .tip {
        color: #fff;
        font-size: 30px;
        text-align: center;
        font-family: 'NotoSansKR';
      }
    }

    .numberPad {
      display: flex;
      flex-direction: column;
      flex: 1;
      background: #fff;
      padding: 30px;

      .pwFind {
        margin-top: 30px;

        .v-btn {
          width: 100%;
          height: 72px;
          border-radius: 15px;
          border: 2px solid #d2d2d2;
          background: rgb(194, 194, 194);
          background: linear-gradient(
            0deg,
            rgba(194, 194, 194, 0.8) 0%,
            rgba(255, 255, 255, 1) 100%
          );

          .v-icon {
            font-size: 36px;
          }
          span {
            font-size: 27px;
            font-family: 'NotoSansKR';
            margin-left: 15px;
            letter-spacing: -0.7px;
          }
        }
      }

      .row {
        display: flex;
        flex: 1;
        margin: 6px 0;

        .v-btn {
          flex: 1;
          height: 72px;
          font-size: 42px;
          background: #fff;
          margin: 0 6px;
          border: 2px solid #d2d2d2;
          border-radius: 15px;
          background: rgb(194, 194, 194);
          background: linear-gradient(
            0deg,
            rgba(194, 194, 194, 0.8) 0%,
            rgba(255, 255, 255, 1) 100%
          );
        }
        .v-icon {
          font-size: 48px;
        }
        .replace {
          font-size: 28px;
          letter-spacing: 0px;
          font-family: 'NotoSansKR';
        }
      }
    }
  }
}
</style>
