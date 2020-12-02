<template>
  <v-dialog v-model="visible" width="900" overlay-opacity="0.8" transition="slide-x-transition">
    <div class="dialog-wrap">
      <div class="dialog-head">
        <span>
          {{ title }}
        </span>
        <v-btn icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="dialog-body" v-html="body"></div>
      <div class="dialog-btns">
        <!-- <v-btn text class="cancle">취소</v-btn> -->
        <v-btn text class="ok" @click="show(false)">확인</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';
import AgreeBody from '@/assets/docs/agree.js';

export default {
  name: 'Agree',
  mixins: [ModalMixin],
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    open(type) {
      if (type === 'user') {
        this.title = '개인정보 취급방침';
        this.body = AgreeBody[type].replace(/\n/g, '<br />');
      } else if (type === 'info') {
        this.title = '키오스크 이용약관';
        this.body = AgreeBody[type].replace(/\n/g, '<br />');
      }
      this.show(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  font-size: 36px;
  font-family: 'NotoSansKR';
  font-weight: 400;
  letter-spacing: -0.7px;
  border-radius: 15px;
  overflow: hidden;
  .dialog-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    height: 100px;
    padding: 0 30px;
    border-bottom: 3px solid #e2e2e2;
    span {
      font-weight: 500;
      color: #292929;
    }
    .v-btn {
      width: 60px;
      height: 60px;
      color: #fff;
      .v-icon {
        font-size: 36px;
        color: #fff;
      }
    }
  }
  .dialog-body {
    flex: 1;
    padding: 30px;
    font-size: 30px;
    background: #fff;
    max-height: 1200px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #ced4da;

      &:hover {
        background-color: #adb5bd;
      }
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }
  }
  .dialog-btns {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;
    border-top: 3px solid #e2e2e2;
    .v-btn {
      font-size: 30px;
      height: 100px;
      width: 150px;
      font-family: 'NotoSansKR';
      border-radius: 0px;
      letter-spacing: -0.7px;
    }
    .v-btn.cancle {
      color: #aaa;
    }
  }
}
</style>
