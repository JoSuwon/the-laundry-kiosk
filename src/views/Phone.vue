<template>
  <DefaultLayout
    ref="defaultLayout"
    @done="nextStep"
  >
    <div class="userLogin">
      <PhoneNumberPanel 
        @phone="phone = $event"
      />
      <PasswordModal 
        ref="passwordModal" 
        :type="type"
        @password="password = $event"
        @onDismiss="password = ''; $refs.passwordModal.password = '';"
        @findPw="findPw"
      />
    </div>
    <ProgressModal 
      ref="progressModal"
      :message="progressMsg"
    />
    <ErrorModal 
      ref="errorModal"
      :message="errorMsg"
    />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import PhoneNumberPanel from '@/components/Phone/PhoneNumberPanel.vue';
import PasswordModal from '@/components/Phone/PasswordModal.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Phone',
  components: {
    DefaultLayout,
    PhoneNumberPanel,
    PasswordModal,
  },
  props: {
    mode: String, // Use, Charge
    done: Function,
  },
  data() {
    return {
      phone: '',
      password: '',
      type: 'check', 
      // check(확인), register(신규생성), repeat(신규생성 확인) 
      // checkTemp(임시비밀번호 확인), update(비밀번호 재설정)
      errorMsg: '', // "비밀번호가 올바르지 않습니다"
      progressMsg: '', //사용자정보를 불러오고 있습니다
      tempPassword: '',
    };
  },
  watch: {
    password(newValue) {
      if(newValue.length === 4) {
        if(this.type === 'check') this.checkPassword();
        else if(this.type === 'register') this.registerPassword();
        else if(this.type === 'repeat') this.repeatPassword();
        else if(this.type === 'checkTemp') this.checkTempPassword();
        else if(this.type === 'update') this.updatePassword();
      }
    },
    phone(newValue) {
      if(newValue.length === 13) {
        this.$refs.defaultLayout.setNext(true);
      } else {
        this.$refs.defaultLayout.setNext(false);
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    ...mapMutations({
      appendUser: 'APPEND_USER',
    }),
    ...mapActions({
      hasUser: 'hasUser',
      userLogin: 'userLogin',
      findPassword: 'findPassword',
      updatePw: 'updatePassword',
    }),
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async nextStep() {
      if(this.phone.length === 13) {
        this.progressMsg = '사용자정보를 불러오고 있습니다';
        this.$refs.progressModal.show(true);
        await this.delay(500);
        const data = await this.hasUser({ phone: this.phone });

        if(data) this.type = 'check';
        else this.type = 'register';

        this.$refs.progressModal.show(false);
        this.$refs.passwordModal.show(true);
      }
    },
    async checkPassword() {
      this.progressMsg = '사용자정보를 불러오고 있습니다';
      this.$refs.progressModal.show(true);
      await this.delay(300);

      const result = await this.userLogin({ password: this.password });
      if(result) {
        this.done();
      } else {
        this.$refs.passwordModal.password = '';
        this.errorMsg = '비밀번호가 올바르지 않습니다';
        this.$refs.errorModal.show(true);
      }

      this.$refs.progressModal.show(false);
    },
    async registerPassword() {
      this.progressMsg = '비밀번호를 설정 중입니다';
      this.$refs.progressModal.show(true);
      await this.delay(300);

      this.appendUser({ password: this.password });
      this.$refs.passwordModal.password = '';
      this.type = 'repeat';

      this.$refs.progressModal.show(false);
    },
    async repeatPassword() {
      this.progressMsg = '사용자정보를 불러오고 있습니다';
      this.$refs.progressModal.show(true);
      await this.delay(300);

      if(this.user.password === this.password) {
        // console.log('새로운회원 비밀번호 확인 성공! 다음페이지로..');
        this.done();
      } else {
        this.$refs.passwordModal.password = '';
        this.errorMsg = '비밀번호가 올바르지 않습니다';
        this.$refs.errorModal.show(true);
      }

      this.$refs.progressModal.show(false);
    },
    async checkTempPassword() {
      this.progressMsg = '사용자정보를 불러오고 있습니다';
      this.$refs.progressModal.show(true);
      await this.delay(300);

      // const result = await this.userLogin({ password: this.password });
      const result = this.password === this.tempPassword;
      if(result) {
        this.$refs.passwordModal.password = '';
        this.type = 'update';
      } else {
        this.$refs.passwordModal.password = '';
        this.errorMsg = '비밀번호가 올바르지 않습니다';
        this.$refs.errorModal.show(true);
      }

      this.$refs.progressModal.show(false);
    },
    async updatePassword() {
      this.progressMsg = '비밀번호를 설정 중입니다';
      this.$refs.progressModal.show(true);
      await this.delay(300);
      
      await this.updatePw({
        phone: this.phone,
        oldPassword: this.tempPassword,
        newPassword: this.password,
      });
      
      this.$refs.passwordModal.password = '';
      this.type = 'check';

      this.$refs.progressModal.show(false);
    },
    async findPw() {
      this.progressMsg = '임시비밀번호를 전송 중입니다';
      this.$refs.progressModal.show(true);
      await this.delay(500);
      this.tempPassword = await this.findPassword({ phone: this.phone });
      this.$refs.progressModal.show(false);
      this.errorMsg = '임시비밀번호가 발송되었습니다';
      this.$refs.errorModal.show(true);
      this.$refs.passwordModal.password = '';
      this.type = 'checkTemp';
    }
  },
}
</script>

<style lang="scss" scoped>
.userLogin{
  position: relative;
  height:100%;
  z-index:99;
}
</style>