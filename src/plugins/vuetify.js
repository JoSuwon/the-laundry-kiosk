import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/assets/css/global.scss';
import '@/assets/css/fonts.scss';

import moment from 'moment';
import VueNumeral from 'vue-numeral-filter';
import VueMoment from 'vue-moment';

import ErrorModal from '@/components/modal/ErrorModal.vue';
import ConfirmModal from '@/components/modal/ConfirmModal.vue';
import ProgressModal from '@/components/modal/ProgressModal.vue';

moment.locale('ko');

Vue.use(Vuetify);
Vue.use(VueMoment, { moment });
Vue.use(VueNumeral);

Vue.component('ErrorModal', ErrorModal);
Vue.component('ConfirmModal', ConfirmModal);
Vue.component('ProgressModal', ProgressModal);

export default new Vuetify({});
