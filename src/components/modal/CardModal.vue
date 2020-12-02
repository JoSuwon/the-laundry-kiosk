<template>
  <v-dialog
    v-model="visible"
    fullscreen
    transition="slide-x-transition"
  >
		<div class="fullDialog">
			<div class="creditModal">
				<div class="title">
					<h2>카드결제</h2>
					<p>※ 보안을 위해 60초 후 자동으로 로그아웃 됩니다.</p>
				</div>
				<div class="guide-image">
					<img src="@/assets/img/card-animation.gif" />
					<!-- card-animation.gif -->
				</div>
				<div class="info-detail">
					<p>카드를 카드결제기에 투입해주세요</p>
					<dl class="price">
						<dt>결제예정금액</dt>
						<dd>
							<strong class="num">{{ inputAmount | numeral(0, 0) }}</strong>
							<span>원</span>
						</dd>
					</dl>
				</div>
				<div class="counter">
					<span>{{ count }}</span>
				</div>
			</div>
		</div>

    <!-- credit-modal -->
  </v-dialog>
</template>

<script>
import ModalMixin from '@/mixins/modal';
import { ipcRenderer } from 'electron';

export default {
  name: 'CardModal',
  props: {
    inputAmount: Number,
  },
  data() {
    return {
      count: 60,
      timer: null,
    };
  },
  watch: {
    visible(newValue) {
      if(newValue) {
        this.count = 60;
        this.timer = setInterval(() => { this.count--; }, 1000);
        ipcRenderer.invoke('card-pay', null, this.inputAmount)
          .then(value => {
            this.$emit('onPay', parseInt(value, 10));
            this.show(false);
          }).catch(() => {
            // console.log(error.message);
            this.show(false);
          });
      } else {
        clearInterval(this.timer);
      }
    },
    count(newValue) {
      if(newValue === 0) {
        clearInterval(this.timer);
        this.show(false);
      }
    }
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
}
</style>
