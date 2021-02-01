<template>
  <div class="login">
    <div class="contents">
      <dl class="loginTitle" @click="exitCount++">
        <dt>관리자로그인</dt>
        <dd>ADMINISTRATOR LOGIN</dd>
      </dl>

      <div class="loginForm">
        <dl class="item">
          <dt>아이디</dt>
          <dd>
            <input type="text" v-model="email" />
          </dd>
        </dl>

        <dl class="item">
          <dt>비밀번호</dt>
          <dd>
            <input type="password" v-model="password" />
          </dd>
        </dl>

        <dl class="item leftText">
          <dt>현금적립률</dt>
          <dd>
            <input type="number" v-model.number="eventRate.cash" />
          </dd>
          <dd class="text">
            <span>%</span>
          </dd>
        </dl>
        <dl class="item leftText">
          <dt>카드적립률</dt>
          <dd>
            <input type="number" v-model.number="eventRate.card" />
          </dd>
          <dd class="text">
            <span>%</span>
          </dd>
        </dl>

        <div class="option">
          <h4>옵션여부</h4>
          <ul>
            <li><input type="checkbox" v-model="options.possibleCard" /><span>카드결제 사용</span></li>
            <li><input type="checkbox" v-model="options.possibleCash" /><span>현금결제 사용</span></li>
            <li><input type="checkbox" v-model="options.hideNoticePage" /><span>결제 및 사용 안내페이지 숨기기</span></li>
          </ul>
        </div>

        <div class="loginBtns">
          <v-btn text @click="adminLogin('koces')">
            KOCES 로그인(32BIT)
          </v-btn>
          <v-btn text @click="adminLogin('kicc')">
            KICC 로그인
          </v-btn>
        </div>
      </div>
    </div>
    <ErrorModal
      ref="errorModal"
      :message="errorMsg"
    />
    <ProgressModal 
      ref="progressModal"
      message="관리자정보를 불러오고 있습니다"
    />
  </div>
</template>

<script>
import { remote } from 'electron';
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      eventRate: {
        cash: 0,
        card: 0,
      },
      options: {
        possibleCard: true,
        possibleCash: true,
        hideNoticePage: false,
      },
      errorMsg: '',
      exitCount: 0,
    };
  },
  watch: {
    exitCount(newValue) {
      if(newValue === 15) {
        remote.app.exit();
      }
    },
  },
  mounted() {
    this.$store.commit('CLEAR_KIOSK');
  },
  methods: {
    ...mapMutations({
      setKiosk: 'SET_KIOSK',
      setCardModule: 'SET_CARD_MODULE',
    }),
    ...mapActions({
      accountLogin: 'accountLogin',
    }),
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async adminLogin(cardModule) {
      if(cardModule === 'koces' && process.arch !== 'ia32') {
        this.errorMsg = 'KOCES는 32비트 전용 입니다';
        this.$refs.errorModal.show(true);
        return;
      }
      if(this.email.length === 0) {
        this.errorMsg = '이메일을 입력해주세요';
      } else if(this.password.length === 0) {
        this.errorMsg = '비밀번호를 입력해주세요';
      } else if(this.eventRate.cash === '') {
        this.errorMsg = '현금적립률을 입력해주세요';
      } else if(this.eventRate.card === '') {
        this.errorMsg = '카드적립률을 입력해주세요';
      } else {
        this.$refs.progressModal.show(true);
        await this.delay(1000);
        this.errorMsg = '';
        this.eventRate.card = this.eventRate.card / 100;
        this.eventRate.cash = this.eventRate.cash / 100;
        this.setKiosk({ EventRate: this.eventRate, Options: this.options });
        this.accountLogin({ email: this.email, password: this.password })
          .then(() => {
            this.setCardModule(cardModule);
            this.$refs.progressModal.show(false);
            this.$router.push({ name: 'Home' });
          })
          .catch((err) => {
            this.$refs.progressModal.show(false);
            if(err.response.status === 404) {
              this.errorMsg = '잘못된 이메일 입니다';
            } else if(err.response.status === 403) {
              this.errorMsg = '비밀번호가 올바르지 않습니다';
            }
            this.$refs.errorModal.show(true);
          })
      }

      if(this.errorMsg !== '') this.$refs.errorModal.show(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 0 60px;

  .loginTitle {
    text-align: center;
    padding: 100px 0;
    dt {
      font-size: 100px;
      line-height: 100px;
      color: #fff;
      font-weight: 500;
    }
    dd {
      margin-top: 30px;
      font-size: 40px;
      line-height: 40px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .loginForm {
    flex: 1;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);

    dl.item {
      flex: 1;
      background: #fff;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
      border-radius: 15px;
      display: flex;
      align-items: center;
      height: 120px;
      position: relative;
      overflow: hidden;
      margin-bottom: 30px;

      dt {
        position: absolute;
        left: 30px;
        font-size: 30px;
        color: #888;
      }
      dd {
        flex: 1;
        input {
          width: 100%;
          height: 120px;
          padding-left: 220px;
          padding-right: 120px;
        }
      }
      dd.text {
        flex: none;
        position: absolute;
        right: 0px;
        width: 120px;
        text-align: center;
      }
    }

    dl.item.leftText {
      input {
        text-align: right;
      }
    }

    .loginBtns {
      display: flex;
      justify-content: space-between;
      .v-btn {
        height: 120px;
        background: #292929;
        color: #fff;
        font-size: 34px;
        width: 48%;
        border-radius: 15px;
      }
    }

    .option {
      margin: 30px 0;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
      overflow: hidden;

      h4 {
        display: flex;
        padding: 0 30px;
        height: 90px;
        background: #f2f2f2;
        align-items: center;
        font-size: 33px;
      }

      ul {
        list-style: none;
        padding: 30px;
        margin: 0;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          input {
            width: 36px;
            height: 36px;
            vertical-align: middle;
          }
          span {
            margin-left: 20px;
            font-size: 33px;
            font-weight: 500;
            font-family: 'NotoSansKR';
          }
        }
        li:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }

  .v-enter-active {
    transition: all 1s ease;
  }

  .v-enter /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
  }
}
</style>
