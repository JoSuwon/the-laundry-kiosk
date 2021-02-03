<template>
  <div class="detail">
    <dl>
      <dt>회원번호</dt>
      <dd>{{ this.user.phone }}</dd>
    </dl>
    <dl>
      <dt>결제방법</dt>
      <dd>{{ this.userAction.method === 'cash' ? '현금' : '카드' }}</dd>
    </dl>
    <div class="divider" />
    <dl>
      <dt>결제 금액</dt>
      <dd>{{ this.userAction.price | numeral('0,0') }} 원</dd>
    </dl>
    <dl class="bonus">
      <dt>적립된 포인트({{ this.userAction.rate * 100 }}%)</dt>
      <dd>
        {{ Math.floor(this.userAction.rate * this.userAction.price) | numeral('0,0') }} 포인트
      </dd>
    </dl>
    <dl class="total">
      <dt>보유 포인트</dt>
      <dd>{{ this.user.point | numeral('0,0') }} 포인트</dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ChargeFinish',
  computed: {
    ...mapState({
      user: state => state.user,
      userAction: state => state.userAction,
    }),
  }
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
      background: #c4342c;
      color: #fff;
      padding: 0 15px;
    }
  }
  dl.bonus {
    dd {
      color: #c4342c;
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
