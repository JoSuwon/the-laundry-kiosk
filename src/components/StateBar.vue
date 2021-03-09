<template> 
	<div class="stateBar">
		<div class="shop">
			<div class="shopName">
				{{ company.name }}
			</div>
			<div class="shopNumber">
				{{ company.tel }}
			</div>
			<div class="cardModule" v-if="cardVersionToggle" @click="toggleVisible">
				{{ cardModule }}
			</div>
			<div class="cardModule" v-if="!cardVersionToggle" @click="toggleVisible">
				V {{ version }}
			</div>
		</div>
		<div class="time">
			{{ now | moment('HH:mm') }}
		</div>
	</div>
</template>

<script>
import { remote } from 'electron';
import { mapState } from 'vuex';
export default {
  name: 'StateBar',
  data() {
    return {
      now: Date.now(),
      timeListener: null,
			cardVersionToggle: true,
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
		version() {
			return remote.app.getVersion();
		},
  },
	methods: {
		toggleVisible() {
			this.cardVersionToggle = !this.cardVersionToggle;
			setTimeout(() => {
				if(!this.cardVersionToggle) {
					this.cardVersionToggle = true;
				}
			}, 5000);
		}
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