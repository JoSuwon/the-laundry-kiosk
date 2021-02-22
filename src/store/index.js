import Vue from 'vue';
import Vuex from 'vuex';
import { kioskAPI } from '@/plugins/axios';
import { createPersistedState } from 'vuex-electron';

Vue.use(Vuex);

function generateDefaultAction(companyId, phone) {
  return {
    companyId,
    phone,
    method: null,
    rate: 0,
    price: 0,
  };
}

function generateDefaultRunAction(companyId, phone) {
  return {
    companyId,
    phone,
    productId: null,
  };
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    company: {},
    kiosk: {},
    machines: {},
    user: {},
    userAction: generateDefaultAction(null, null), // companyId, phone, method(card, cash), rate, price
    runAction: generateDefaultRunAction(null, null),
    cardModule: {
      type: null,
    },
    kioskId: '',
  },
  // getters: {
  //   getProudctInfo: (state) => (serviceId) => {
  //     console.log(serviceId);
  //     const machines = state.machines;
  //     let selectedMachine = null;
  //     let selectedProduct = null;
  //     selectedMachine = machines.filter(machine => {
  //       return machine.services.filter(service => {
  //         if(service.id === serviceId) {
  //           selectedProduct = service;
  //           return true;
  //         }
  //       });
  //     });
  //     console.log(selectedMachine, selectedProduct);
  //     return {
  //       machine: selectedMachine.name,
  //       product: selectedProduct.name,
  //       runTimeSec: selectedProduct.runTimeSec
  //     };
  //   },
  // },
  mutations: {
    SET_COMPANY(state, value) {
      state.company = value;
    },
    SET_KIOSK(state, value) {
      state.kiosk = value;
    },
    SET_MACHINES(state, value) {
      state.machines = value;
    },
    CLEAR_KIOSK(state) {
      state.company = {};
      // state.kiosk = {};
      state.machines = {};
      state.cardModule.type = null;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    APPEND_USER(state, value) {
      state.user = Object.assign({}, state.user, value);
    },
    APPEND_ACTION(state, value) {
      state.userAction = Object.assign({}, state.userAction, value);
    },
    CLEAR_ACTION(state) {
      state.user = {};
      state.userAction = generateDefaultAction(state.company.id, null);
      state.runAction = generateDefaultRunAction(state.company.id, null);
    },
    APPEND_RUN_ACTION(state, value) {
      state.runAction = Object.assign({}, state.runAction, value);
    },
    SET_CARD_MODULE(state, value) {
      state.cardModule.type = value;
    },
    SET_KIOSK_ID(state, value) {
      state.kioskId = value;
    },
  },
  actions: {
    async accountLogin({ commit }, { email, password }) {
      const { data: company } = await kioskAPI({
        method: 'post',
        url: '/company',
        data: { email, password },
      });
      const { data: machines } = await kioskAPI({
        method: 'get',
        url: `/company/${company.id}/devices`,
      });
      commit('SET_COMPANY', company);
      commit('SET_MACHINES', machines);

      return company;
    },
    async hasUser({ state, commit }, { phone }) {
      const { id: company } = state.company;
      commit('APPEND_ACTION', { companyId: company, phone });
      commit('APPEND_RUN_ACTION', { companyId: company, phone });
      try {
        const { data: user } = await kioskAPI({
          method: 'get',
          url: '/user',
          params: { company, phone },
        });
        commit('SET_USER', {
          companyId: user.companyId,
          phone,
          point: parseInt(user.point, 10),
          newUser: false,
        });
        return true;
      } catch (err) {
        console.log(err, err.message);
        commit('SET_USER', { companyId: company, phone, point: 0, newUser: true });
        return false;
      }
    },
    async userLogin({ state }, { password }) {
      const { companyId, phone } = state.user;
      try {
        await kioskAPI({
          method: 'post',
          url: '/user',
          data: { companyId, phone, password },
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    async findPassword({ state }, { phone }) {
      const companyId = state.company.id;
      const pw = await kioskAPI({
        method: 'post',
        url: '/user/password/reset',
        data: { companyId, phone },
      });
      return pw.data.digest;
    },
    async updatePassword({ state }, { phone, oldPassword, newPassword }) {
      const companyId = state.company.id;
      // console.log(companyId, phone, oldPassword, newPassword);
      await kioskAPI({
        method: 'put',
        url: '/user/password',
        data: { companyId, phone, oldPassword, newPassword },
      });
    },
    async chargePoint({ state }) {
      if (state.user.newUser) {
        await this.dispatch('userSignup');
      }
      const form = state.userAction;
      const res = await kioskAPI({
        method: 'post',
        url: '/pay',
        data: form,
      });
      return res;
    },
    async userSignup({ state }) {
      const companyId = state.company.id;
      const phone = state.user.phone;
      const password = state.user.password;
      await kioskAPI({
        method: 'post',
        url: '/user',
        data: { companyId, phone, password },
      });
      state.user.newUser = false;
    },
    async runMachine({ state }) {
      const form = state.runAction;
      console.log(form);
      const res = await kioskAPI({
        method: 'post',
        url: '/run',
        data: form,
      });
      return Object.assign({}, res, {
        data: {
          ...res.data,
          point: parseInt(res.data.point, 10),
        },
      });
      // return res;
    },
    async refreshKioskConfig({ state, commit }) {
      // console.log('refreshKioskConfig');
      // state.kiosk 정보는 adminLogin시 주입
      // state.company, state.machines 정보 새로고침 필요
      const { data } = await kioskAPI({
        method: 'get',
        url: `/company/${state.company.id}`,
      });
      const { franchiseId, name, tel } = data;
      commit('SET_COMPANY', Object.assign(state.company, { franchiseId, name, tel }));

      const { data: machines } = await kioskAPI({
        method: 'get',
        url: `/company/${state.company.id}/devices`,
      });
      commit('SET_MACHINES', machines);
    },
  },
  modules: {},
});
