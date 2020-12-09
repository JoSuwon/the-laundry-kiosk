<template>
	<GuideLayout>
		<div class="guide-img">
			<img :src="`http://admin.payot-coin.com/kiosk/5.0.0/${docs[type].image}`">
		</div>
	</GuideLayout>
</template>

<script>
import GuideLayout from '@/components/layout/GuideLayout.vue';

const DOCS = {
  join: {
    message: '키오스크 이용방법',
    image: 'join-guide.png',
  },
  'wash': {
    message: '세탁기 이용방법',
    image: 'wash-guide.png',
  },
  'dry': {
    message: '건조기 이용방법',
    image: 'dry-guide.png',
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

.guide-img{
	position:absolute;
	z-index:1;
	left:0px;
	width:100%;
	flex:1;
	overflow-y:hidden;
	img{width:100%;}
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
