<template>
	<div class="credit">
		<div class="titleHead">
			<div class="homeBtn" @click="$router.replace({ name: 'Home' })">
				<div class="inner">
					<v-icon>mdi-home</v-icon>
					<span>처음으로</span>
				</div>
			</div>
			<dl>
					<dt>{{$route.meta.title}}</dt>
					<dd>{{$route.meta.subTitle}}</dd>
			</dl>
		</div>
		<div class="section">
			<div class="text"> 
				<div class="text1">포인트 충전을 위한 </div>
				<div class="text2">결제방법을 선택해주세요</div>
			</div>
			
			<v-row>
				<v-col cols="6">
					<div class="item cash" v-ripple @click="nextStep('cash')">
						<div class="img">
							<img src="@/assets/img/cash.png">
						</div>
						<div class="btn">
							<v-btn >현금으로 충전</v-btn>
						</div>
					</div>
				</v-col>
				<v-col cols="6">
					<div class="item card" v-ripple @click="nextStep('card')">
						<div class="img">
							<img src="@/assets/img/card.png">
						</div>
						<div class="btn">
							<v-btn>신용카드 충전</v-btn>
						</div>
					</div>
				</v-col>
			</v-row>
			<div class="logo">
				<img src="@/assets/img/logo_b.png">
			</div>
		</div>
		<Waves />
	</div>
</template>

<script>
// import Waves from '@/components/Waves.vue';
import Waves from '@/components/Waves';

export default {
  name: 'Credit',
  components: {
    Waves,
  },
  methods: {
    nextStep(method) {
      const rate = this.$store.state.kiosk.EventRate[method];
      this.$store.commit('APPEND_ACTION', { method, rate });
      this.$router.push({ name: 'Detail', params: { type: 'Charge' } });
    },
  },
}
</script>


<style lang="scss" scoped>

.credit{
	padding:0 60px;
}

.titleHead{
    display: flex;
    flex-direction: row; 
    align-items: center;
    height: 240px;

  .homeBtn {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    margin-right: 30px;
    border:3px solid #a8a8a8;
    background: rgb(194,194,194);
    background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

    .inner{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:105px;
      width:105px;
      border-radius:50px;
      background: rgb(194,194,194);
      background: linear-gradient(180deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

      .v-icon {
        font-size: 45px;
      }

      span{
        font-size:20px;
        font-weight:bold;
      }
    }
	}

	dl {
    dt {
      font-size: 48px;
      color: #fff;
      font-weight: 500;
    }
    dd {
      color: #fff;
      font-size:32px;
    }
  }
}

.section{
	z-index:99;

.text{
	margin-top:60px;
	font-size:72px;
	line-height:72px;
	color:#fff;
	.text1{font-weight:300;}
	.text2{font-weight:500;margin-top:15px;}
}


.item{
	display:flex;
	flex-direction: column;
	justify-content: space-between;
	background:#fff;
	border-radius:15px;
	overflow:hidden;
	text-align:center;
	min-height:720px;
	box-shadow: 0 0 30px rgba(0,0,0,0.15);

	.img{
		img{width:100%;}
	}

	dl{
		padding:30px;

		dt{
			font-size:42px;
			font-weight:500;
		}
		dd{
			font-size:36px;
			color:#00a0e9;
		}
	}

	.btn{
		padding:45px;
		.v-btn{
			width:100%;
			min-height:80px;
			font-size:36px;
			letter-spacing:-0.7px;
			border:2px solid #c2c2c2;
			border-radius:15px;
			box-shadow: 8px 8px 15px rgba(0,158,230,0.6);
			background: rgb(194,194,194);
			background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);
		}
	}

}
.item.cash{margin-top:100px;}
.item.card{margin-top:250px;}

.logo{
	padding:60px 0;
	width:100%;
	text-align:center;
	z-index: 3;
	position:absolute;
	bottom:0px;
	left:0px;
	
	img{
		height:50px;
	}
}


}
</style>
