<template> 
	<div class="stateBar">
		<div class="shop">
			<div class="shopName" @click="leftClick">
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
		<div class="time" @click="rightClick">
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
			leftCount: 0,
			rightCount: 0,
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
			},
    }),
		version() {
			return remote.app.getVersion();
		},
		routeName() {
			return this.$route.name;
		}
  },
	watch: {
		routeName(newValue) {
			if(newValue === 'Home') {
				this.leftCount = 0;
				this.rightCount = 0;
			}
		}
	},
	methods: {
		toggleVisible() {
			this.cardVersionToggle = !this.cardVersionToggle;
			setTimeout(() => {
				if(!this.cardVersionToggle) {
					this.cardVersionToggle = true;
				}
			}, 5000);
		},
		leftClick() {
			if(this.routeName !== 'Home') return;

			if(this.rightCount === 0 && this.leftCount < 3) {
				this.leftCount++;
			} else if(this.rightCount === 3 && this.leftCount < 7) {
				this.leftCount++;
			}
		},
		rightClick() {
			if(this.routeName !== 'Home') return;

			if(this.leftCount === 3 && this.rightCount < 3) {
				this.rightCount++;
			} else if(this.leftCount === 7 && this.rightCount < 7) {
				this.rightCount++;
				if(this.rightCount === 7) {
					this.$router.push({ name: 'AdminLogin' });
				}
			}
		},
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