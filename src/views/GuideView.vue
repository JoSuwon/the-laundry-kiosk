<template>
	<GuideLayout>
		<div class="guide-head">
			<strong>
				{{ docs[type].title }}
			</strong>
			<span>
				{{ docs[type].description }}
			</span>
		</div>
		<div class="guide-img">
			<img :src="`http://admin.payot-coin.com/kiosk/zatacso/${docs[type].image}`">
		</div>
	</GuideLayout>
</template>

<script>
import GuideLayout from '@/components/layout/GuideLayout.vue';

const DOCS = {
  join: {
    message: '키오스크 이용방법',
		image: 'guide_01.png',
		title: '회원가입 후 포인트 충전하기',
		description: '핸드폰 번호를 통하여 회원가입 및 포인트 적립이 이루어집니다',
  },
  'wash': {
    message: '세탁기 이용방법',
		image: 'guide_02.png',
		title: '세탁기 사용방법',
		description: '핸드폰 번호에 적립된 포인트를 이용하여 결제를 할 수 있습니다',
  },
  'dry': {
    message: '건조기 이용방법',
		image: 'guide_03.png',
		title: '건조기 사용방법',
		description: '핸드폰 번호에 적립된 포인트를 이용하여 결제를 할 수 있습니다',
  },
};

export default {
	components:{
		GuideLayout
	},
	props: {
    type: String, // 표현될 가이드 타입
    done: {
      type: Function,
      default: null, // 가이드 이후 다음페이지 이동
    },
  },
  data() {
    return {
      docs: DOCS,
    };
  },
}
</script>

<style lang="scss" scoped>
.guide{
  flex:1;
}

.guide-head {
	background: #c4342c;
	padding-top: 25px;
	height: 120px;
	display: table;
	width: 100%;
	color: #ffffff;
	strong {
		display: block;
		font-size: 55px;
	}
	span {
		font-size: 35px;
		color: #dddddd
	}
}

.guide-img{
	padding: 40px;
	position:absolute;
	z-index:1;
	left:0px;
	width:100%;
	flex:1;
	overflow-y:hidden;
	img{width:100%;border-radius: 15px;}
}


.backBtn{
	display:flex;
	flex-direction: row;
	padding:50px;
	border-radius:15px;
	overflow:hidden;
	z-index:3;

	.v-btn{
		flex:1;
		height:120px;
		background:#292929;
		border-radius:15px;
		color:#fff;

		.v-icon{font-size:42px;margin-right:15px;}
	}
}


</style>
