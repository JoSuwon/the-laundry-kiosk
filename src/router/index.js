import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import AdminLogin from '@/views/AdminLogin.vue';

import Home from '@/views/Home.vue';
import Phone from '@/views/Phone.vue';

import PointGuide from '@/views/PointGuide.vue';
import Point from '@/views/Point.vue';
import Credit from '@/views/Credit.vue';

import OrderGuide from '@/views/OrderGuide.vue';
import Product from '@/views/Product.vue';

import Detail from '@/views/Detail.vue';
import Finish from '@/views/Finish.vue';

import GuideList from '@/views/GuideList.vue';
import GuideView from '@/views/GuideView.vue';

import ErrorPage from '@/views/Error.vue';
import EmptyPage from '@/views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Phone',
    name: 'Phone',
    component: Phone,
    props: route => route.params,
    meta: {
      title: '휴대전화번호 입력',
      subTitle: '포인트 충전 및 적립을 위한 전화번호를 입력해주세요',
    },
  },
  {
    path: '/PointGuide',
    name: 'PointGuide',
    component: PointGuide,
    beforeEnter: (to, from, next) => {
      const { hideNoticePage } = store.state.kiosk?.Options;
      if(hideNoticePage) {
        next({ name: 'Point' });
      } else {
        next();
      }
    },
  },
  {
    path: '/OrderGuide',
    name: 'OrderGuide',
    component: OrderGuide,
    beforeEnter: (to, from, next) => {
      const { hideNoticePage } = store.state.kiosk?.Options;
      if(hideNoticePage) {
        next({ name: 'Product' });
      } else {
        next();
      }
    },
  },
  {
    path: '/Point',
    name: 'Point',
    component: Point,
    meta: {
      title: '포인트 충전하기',
      subTitle: '필요하신 금액을 선택 후 결제해주세요',
    },
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product,
    meta:{
      title:'장비 및 상품선택',
      subTitle:'사용하실 장비와 상품을 선택해주세요'
    }
  },
  {
    path: '/Credit',
    name: 'Credit',
    component: Credit,
    meta: {
      title: '포인트 충전방법 선택',
    },
    beforeEnter: (to, from, next) => {
      const options = store.state.kiosk.Options;
      const allPayMode = options.possibleCard && options.possibleCash;
      if(allPayMode) {
        next();
      } else {
        const method = options.possibleCash ? 'cash' : 'card';
        const rate = store.state.kiosk.EventRate[method];
        store.commit('APPEND_ACTION', { method, rate });
        next({ name: 'Detail', params: { type: 'Charge' } });
      }
    },
  },
  {
    path: '/Detail',
    name: 'Detail',
    component: Detail,
    props: route => route.params,
    meta:{
      title:'서비스확인 및 포인트사용',
      subTitle:'선택하신 서비스와 결제금액을 확인해주세요'
    }
  },
  {
    path: '/Finish',
    name: 'Finish',
    component: Finish,
    props: route => route.params,
  },
  {
    path: '/GuideList',
    name: 'GuideList',
    component: GuideList,
    meta: {
      title: '이용안내 선택',
      subTitle: '궁금하신 장비의 메뉴얼을 선택해주세요'
    },
  },
  {
    path: '/GuideView',
    name: 'GuideView',
    component: GuideView,
    props: route => route.params,
  },
  {
    path: '/Error',
    name: 'Error',
    component: ErrorPage,
    props: route => route.params,
  },
  {
    path: '*',
    component: EmptyPage,
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAccountLogin = store.state.company.id;
  const loginLessPageName = ['AdminLogin', 'Error'].includes(to.name);

  if(!isAccountLogin && !loginLessPageName) {
    next({ name: 'AdminLogin' });
  } else {
    next();
  }
});

export default router;
