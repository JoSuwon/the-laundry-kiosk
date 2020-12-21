<template>
  <DefaultLayout
    ref="defaultLayout"
    @done="nextStep"
  >
    <UserState />
    <ProductList 
      @onMachine="selectMachine($event)"
      @onProduct="selectProduct($event)"
    />   
    <SelectedBox 
      :selectedMachine="selectedMachine"
      :selectedProduct="selectedProduct"
    />
    <ConfirmModal
      ref="confirmModal"
      @confirmOkay="$router.push({ name: 'PointGuide' })"
    >
      포인트가 부족합니다.<br>
      충전하시겠습니까?
    </ConfirmModal>
    <ErrorModal
      message="상품을 선택해주세요"
      ref="errorModal"
    />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import ProductList from '@/components/Product/ProductList.vue';
import SelectedBox from '@/components/Product/SelectedBox.vue';
import UserState from '@/components/UserState';
import { mapState } from 'vuex';

export default {
  name: 'Product',
  components:{
    DefaultLayout,
    UserState,
    ProductList,
    SelectedBox,
  },
  data() {
    return {
      selectedMachine: null,
      selectedProduct: null,
    };
  },
  watch: {
    selectedProduct(newValue) {
      if(newValue) {
        this.$refs.defaultLayout.setNext(true);
      } else {
        this.$refs.defaultLayout.setNext(false);
      }
    }
  },
  computed: {
    ...mapState({
      myPoint: state => state.user.point,
    }),
  },
  methods:{
    selectMachine(machine) {
      // console.log('selectMachine', machine);
      this.selectedMachine = machine;
    },
    selectProduct(product) {
      // console.log('selectProduct', product);
      this.selectedProduct = product;
    },
    nextStep(){
      if(!this.selectedProduct) {
        this.$refs.errorModal.show(true);
        return;
      }

      if(parseInt(this.myPoint, 10) >= parseInt(this.selectedProduct.price, 10)) {
        this.$store.commit('APPEND_RUN_ACTION', { productId: this.selectedProduct.id });
        this.$router.push({ name:'Detail', params: { type: 'Use' } });
      } else {
        this.$refs.confirmModal.show(true);
      }
    },
  }
  
};
</script>

