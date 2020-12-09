<template>
  <div class="basket">
    <dl class="selected">
      <dt>선택한 장비</dt>
      <dd v-if="selectedMachine !== null">{{ selectedMachine.name }}</dd>
      <dd v-if="selectedMachine === null"></dd>
    </dl>
    <dl class="price">
      <dt>선택한 금액</dt>
      <dd>
        <span v-if="selectedProduct !== null">{{ parseInt(selectedProduct.price, 10) | numeral(0, 0) }} 원</span>
        <span v-if="selectedProduct === null">0 원</span> 
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'SelectedBox',
  props: {
    selectedMachine: {
      type: Object,
      default: null,
    },
    selectedProduct: {
      type: Object,
      default: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.basket{
  background:#fff;
  border-radius:15px;
  box-shadow: 0 0 30px rgba(0,0,0,0.15);
  overflow: hidden;

  dl{
    height:108px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:0 30px;

    dt{
      font-size:30px;
      font-weight:500
    }
  }

  .selected{
    background:#f2f2f2;
    border-bottom:3px solid #e2e2e2;
  }
  .price{
    dd{
      span{
        color:#d22828
      }
    }
  }

}
</style>