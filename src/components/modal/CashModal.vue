<template>
  <v-dialog
    v-model="visible"
    fullscreen
    transition="slide-x-transition"
  >
		<div class="fullDialog">
			<div class="creditModal">
				<div class="title">
					<h2>현금결제</h2>
					<p>※ 보안을 위해 60초 후 자동으로 로그아웃 됩니다.</p>
				</div>
				<div class="guide-image">
					<img src="@/assets/img/cash-animation.gif" />
					<!-- card-animation.gif -->
				</div>
				<div class="info-detail">
					<p>현금결제기에 현금을 투입해주세요</p>
					<dl class="price">
						<dt>결제예정금액</dt>
						<dd>
							<strong class="num">{{ parseInt(inputAmount, 10) | numeral('0,0') }}</strong>
							<span>원</span>
						</dd>
					</dl>
					<dl class="push_price">
						<dt>삽입된 금액</dt>
						<dd>
							<strong class="num">{{ parseInt(currentMoney, 10) | numeral('0,0') }}</strong>
							<span>원</span>
						</dd>
					</dl>
				</div>
				<div class="divider" />
				<div class="guideText">
					<v-icon color="#fff000" size="80">mdi-exclamation-thick</v-icon>
					<span>현금충전시 잔액이 반환되지 않습니다.
투입한 금액이 전액 충전되니 주의 바랍니다.</span>
				</div>
				<div class="counter">
					<span>{{ count }}</span>
				</div>
				<div class="btns">
					<v-btn text @click="closeModal">취소</v-btn>
				</div>
			</div>
		</div>

    <!-- credit-modal -->
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';
import { ipcRenderer } from 'electron';
import { debounce } from 'lodash';

export default {
  name: 'CashModal',
  props: {
    inputAmount: Number,
  },
  data() {
    return {
      currentMoney: 0,
      count: 60,
      timer: null,
    };
  },
  watch: {
    visible(newValue) {
      if(newValue) {
        ipcRenderer.invoke('cash-open', true);
        this.count = 60;
        this.timer = setInterval(() => { this.count--; }, 1000);
      } else {
        ipcRenderer.invoke('cash-open', false);
        clearInterval(this.timer);
      }
    },
    currentMoney(newValue) {
      if(newValue >= this.inputAmount) {
        ipcRenderer.invoke('cash-open', false);
        this.onPay(newValue);
      }
      if(this.count === 0) {
        ipcRenderer.invoke('cash-open', false);
        this.onPay(newValue);
      }
    },
    count(newValue) {
      if(newValue === 0 && this.currentMoney === 0) this.show(false);
      else if(newValue === 0 && this.currentMoney > 0) {
        clearInterval(this.timer);
        ipcRenderer.invoke('cash-open', false);
        this.onPay(this.currentMoney);
      }
    },
  },
  mounted() {
    ipcRenderer.on('cash-input', this.onInputEvent);
  },
  methods: {
    closeModal() {
      if(this.currentMoney === 0) this.show(false);
    },
    onInputEvent(event, money) {
      this.currentMoney += money;
    },
    onPay: debounce(function (newValue) {
      this.$emit('onPay', newValue);
      this.show(false);
    }, 2000),
  },
  beforeDestroy() {
    ipcRenderer.invoke('cash-open', false);
    ipcRenderer.removeListener('cash-input', this.onInputEvent);
  },
  mixins: [ModalMixin],
}
</script>

<style lang="scss" scoped>

.fullDialog{
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.8);
}

.creditModal {
  position: relative;
  font-size: 36px;
  font-family: 'NotoSansKR';
	letter-spacing: -0.7px;
	color:#fff;
	max-width:700px;
	
	.title{
		display:flex;
		align-items: center;
		margin-bottom:30px;
		
		h2{
			font-size:54px;
			line-height:54px;
			font-weight:500;
			font-family:'NotoSansKR';
		}
		p{
			flex:1;
			margin:0px;
			margin-left:45px;
			font-size:32px;
			font-family:'NotoSansKR';
			word-break: keep-all;
			line-height:42px;
			
		}
	}

  .guide-image {
    background: #fff;
		border: 3px solid #e2e2e2;
    min-height: 560px;
    margin-bottom: 45px;
    border-radius: 15px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      height: 100%;
    }
  }

  .info-detail {
    p {
      margin: 0px;
      padding: 0px;
      background: rgba(225, 255, 255, 0.1);
      text-align: center;
      padding: 10px 20px;
      margin-bottom: 30px;
      font-size: 33px;
			border-radius: 15px;
    }

    dl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      dt {
        font-size: 36px;
        color: #fff;
      }
      dd {
				font-size:36px;
        strong {
          margin-right: 15px;
        }
      }
    }
    dl:last-child {
      margin-bottom: 0px;
    }

    dl.push_price {
      dd {
        strong {
          color: #e1137e;
        }
      }
    }
  }

  .divider {
		height: 3px;
		background:#fff;
    margin: 45px 0;
  }

  .guideText {
		display:flex;
		align-items: center;
		background:rgba(0,0,0,0.8);
		border-radius:15px;
		padding:15px;

		.v-icon{
			margin-right:30px;
		}
		span{
			flex:1;
			color:#ff0000;
			font-weight:500;
			word-break: keep-all;
			letter-spacing: -1px;
		}

  }

  .counter {
    position: fixed;
    right: 75px;
    top: 75px;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      border-radius: 50%;
			background: #fff;
			color: #292929;
      font-size: 56px;
      font-weight: 600;
    }
	}
	.btns{
		text-align:center;
		.v-btn{
			margin-top:90px;
			width:350px;
			font-size:36px;
			min-height:100px;
			border-radius:15px;
			background: rgb(194,194,194);
			background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
			box-shadow: 10px 10px 20px rgba(0,158,230,0.6);
		}
	}
}
</style>
