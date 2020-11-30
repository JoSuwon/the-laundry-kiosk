<template>
  <v-dialog 
    v-model="visible" 
    width="unset" 
    overlay-opacity="0.8"
    fullscreen
    transition="slide-x-transition"
  >
    <div class="errorModal">
      <div class="errorMessage">
        {{ this.message }}
      </div>
      <div class="modalAction">
        <v-btn text @click="visible = false">
          확인
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';
export default {
  name: 'ErrorModal',
  props: {
    message: String,
  },
  mixins: [ModalMixin],
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.errorModal{
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

  .errorMessage{
    text-align:center;
    font-size:46px;
    font-weight:500;
    margin-top:15px;
    color:#fff;
  }
  .modalAction{
    text-align:center;
    margin-top:45px;

    .v-btn{
      min-height:90px;
      width:210px;
      font-size:36px;
      border-radius:15px;
      border:3px solid #e2e2e2;
      background: rgb(194,194,194);
      background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
      box-shadow: 10px 10px 20px rgba(0,158,230,0.6);
    }
  }
}
</style>
