<template>
  <dl class="userState">
    <dt>나의 포인트</dt>
    <dd>
      <span>
        <strong>{{ user.point | numeral('0,0') }}</strong> 포인트
      </span>
      <v-btn text @click="$router.push('PointGuide')">충전하기</v-btn>
    </dd>
  </dl>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'UserState',
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
}
</script>

<style lang="scss" scoped>
.userState{
  display:flex;
  justify-content: space-between;
  align-items:center;
  background:#292929;
  height:120px;
  padding:0 30px;
  border-radius:15px;
  margin-bottom:30px;

  dt{color:#fff;}
  dd{
    display:flex;
    align-items: center;
    color:#fff;
    span{
      strong{color:#ffba00}
    }
    .v-btn{
      height:60px;
      margin-left:30px;
      font-size:30px;
      background:#fff;
      border-radius:9px;
    }
  }
}
</style>