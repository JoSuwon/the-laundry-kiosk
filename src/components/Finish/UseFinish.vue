<template>
  <div class="detail">
    <dl>
      <dt>회원번호</dt>
      <dd>{{ user.phone }}</dd>
    </dl>
    <dl class="eqName">
      <dt>선택한 장비</dt>
      <dd>{{ selectedMachine.name }}</dd>
    </dl>
    <div class="divider" />
    <dl>
      <dt>상품명</dt>
      <dd>{{ selectedProduct.name }}</dd>
    </dl>
    <dl>
      <dt>상품가격</dt>
      <dd>{{ parseInt(selectedProduct.price, 10) | numeral(0, 0) }} 원</dd>
    </dl>
    <div class="divider" />
    <dl>
      <dt>사용된 포인트</dt>
      <dd>{{ parseInt(selectedProduct.price, 10) | numeral(0, 0) }} 포인트</dd>
    </dl>
    <dl class="total">
      <dt>남은 포인트</dt>
      <dd>{{ parseInt(user.point, 10) | numeral(0, 0) }} 포인트</dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'UseFinish',
  props: {
    selectedMachine: Object,
    selectedProduct: Object,
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background: #fff;
  border-radius: 15px;
  padding: 50px;
  overflow-y: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);

  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    dt {
      font-size: 30px;
      color: #888;
    }
    dd {
      font-weight: 500;
    }
  }
  dl.eqName {
    dd {
      background: #a22123;
      color: #fff;
      padding: 0 15px;
    }
  }
  dl.bonus {
    dd {
      color: #a22123;
    }
  }
  dl.total {
    dd {
      color: #d32078;
    }
  }
  dl:last-child {
    margin-bottom: 0px;
  }
  .divider {
    height: 3px;
    background: #e2e2e2;
    margin: 30px 0;
  }
}
</style>
