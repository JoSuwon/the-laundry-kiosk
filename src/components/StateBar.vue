<template> 
	<div class="stateBar">
		<div class="shop">
			<div class="shopName">
				{{ company.name }}
			</div>
			<div class="shopNumber">
				{{ company.tel }}
			</div>
			<div class="cardModule">
				{{ cardModule }}
			</div>
		</div>
		<div class="time">
			{{ now | moment('HH:mm') }}
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'StateBar',
  data() {
    return {
      now: Date.now(),
      timeListener: null,
    };
  },
  mounted() {
    this.timeListener = setInterval(() => {
      this.now = Date.now();
    }, 60000);
  },
  computed: {
    ...mapState({
			company: state => state.company,
			cardModule: state => {
				return state.cardModule?.type ? state.cardModule.type.toUpperCase() : '';
			}
    }),
  },
  beforeDestroy() {
    clearInterval(this.timeListener);
  },
}
</script>

<style lang="scss" scoped>

.stateBar{
	display:flex;
	min-height:70px;
	font-size:24px;
	font-family:'NotoSansKR';
	letter-spacing:-0.7px;
	justify-content:space-between;
	align-items: center;
	padding:0 30px;
	color:#fff;
	background:#292929;

	.shop{
		display:flex;
		.shopName{margin-right:30px;}
		.shopNumber{margin-right:30px;}
	}
}
</style>