<template>
  <v-dialog 
		v-model="visible" 
		width="unset" 
		overlay-opacity="0.8"
		fullscreen
    transition="slide-x-transition"
	>
		<div class="messageModal">
			<div class="messageText">
				<slot />
				<!-- 포인트가 부족합니다
				충전하시겠습니까? -->
			</div>
			<div class="modalAction">
				<v-btn @click="show(false);">취소</v-btn>
				<v-btn @click="confirmOkay">확인</v-btn>
			</div>
		</div>
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';

export default {
	name: 'ConfirmModal',
	mixins: [ModalMixin],
	methods: {
		confirmOkay() {
			this.$emit('confirmOkay');
			this.show(false);
		},
	},
}
</script>

<style lang="scss" scoped>
.messageModal{
	height:100%;
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background:rgba(0,0,0,0.8);
	font-family:'NotoSansKR';

	.messageText{
		text-align:center;
		font-size:46px;
		color:#fff;
		word-break: keep-all;
	}

	.modalAction{
    text-align:center;
    margin-top:45px;

    .v-btn{
			margin:0 15px;
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
