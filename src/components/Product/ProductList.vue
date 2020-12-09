<template>
  <div class="productList">
    <dl class="eqList">
      <dt><span>1</span> 기기선택</dt>
      <dd>
        <div class="item" 
          :class="[item.type, {active:eqActive === index}]" 
          v-for="(item, index) in eqList" 
          :key="index"
          @click="eqSelect(index)"
        >
          <span>{{item.name}}</span>
          <strong>{{item.size}}</strong>
        </div>
      </dd>
    </dl>
  
    <dl class="goodsList">
      <dt><span>2</span> 투입금액<label> (세탁코스에 맞는 요금을 선택하세요)</label></dt>
      <dd v-if="eqActive !== -1">
        <div 
          class="item" 
          :class="{active: goodsActive === index}" 
          v-for="(item, index) in selectedMachine.services" 
          :key="index"
          @click="goodsSelect(index)"
        >
          <div class="itemName">{{ item.name }}</div>
          <div class="itemInfo">
            <span class="price"><b>{{ parseInt(item.price, 10) | numeral('0,0') }}</b>원</span>
          </div>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ProductList',
  data() {
    return {
      eqActive: -1,
      goodsActive: -1,
      selectedMachine: null,
      selectedProduct: null,
    };
  },
  computed: {
    ...mapState({
      eqList: state => state.machines,
    }),
  },
  methods:{
    eqSelect(index){
      this.eqActive = index
      this.selectedMachine = this.eqList[index];
      this.goodsSelect(-1);
      this.$emit('onMachine', this.selectedMachine);
    },
    goodsSelect(index){
      this.goodsActive = index
      this.selectedProduct = this.selectedMachine.services[index];
      this.$emit('onProduct', this.selectedProduct);
    },
  },
}
</script>

<style lang="scss" scoped>

.productList{
  height:950px;
  display:flex;
  margin-bottom:30px;
  border-radius:15px;
  overflow:hidden;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  background:#fff;
  
  dl{
    display:flex;
    flex:1;
    flex-direction: column;
    background:#fff;
    border-right:3px solid #e2e2e2;

    dt{
      text-align:center;
      font-size:28px;
      line-height:80px;
      border-bottom:3px solid #e2e2e2;

      span{
        font-weight:500;
        font-size:28px;
        color:#d22828;
      }
      label{
        font-size:24px;
      }
    }
    dd{
      text-align:center;
      font-size:30px;
    }
  }
  
  dl.eqList{
    flex:2;

    dd{
      overflow-y:scroll;
      padding:15px;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #ced4da;

        &:hover {
          background-color: #adb5bd;
        }
      }
      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
      }

      .item{
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom:15px;
        padding:15px;
        border-radius:15px;
        border:3px solid #e2e2e2;
        background: rgb(194,194,194);
        background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

        span{
          display:block;
          padding:6px 15px;
          text-align:center;
          border-radius:9px;
          font-size:24px;
          margin-right:15px;
          color:#292929;
        }

        strong{
          display:block;
          font-weight:normal;
          font-size:24px;
        }
      }

      .item.wash{ // 세탁기 라벨 컬러
			  span{background:#00a0e9}
      }
      .item.dry{ // 건조기 라벨 컬러
        span{background:#f96e6e}
      }
      .item.etc{ // 기타장비 라벨 컬러
        span{background:#005981}
      }

      .item.active{ // 기기선택 활성화
        background:#013a84;
        color:#fff;
        span{
          background:#fff;
          color:#013a84
        }
      }
    }
  }

  dl.goodsList{
    flex:3;
    

    dd{
      overflow-y:scroll;
      padding:15px;

      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #ced4da;

        &:hover {
          background-color: #adb5bd;
        }
      }
      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
      }

      .item{
        padding:15px;
        text-align:left;
        display:flex;
        align-items: flex-start;
        justify-content: space-between;
        width:100%;
        margin-bottom:15px;
        border-radius:15px;
        border:3px solid #e2e2e2;
        background: rgb(194,194,194);
        background: linear-gradient(0deg, rgba(194,194,194,1) 0%, rgba(255,255,255,1) 100%);

        .itemName{
          flex:1;
          margin-right:30px;
        }
      }
      .item.active{
        border:3px solid #00a0e9;
        .number{background:#00a0e9;color:#fff;}
		  }
    }
  }
}
</style>