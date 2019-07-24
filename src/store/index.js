import Vuex from 'vuex';
import Vue from 'vue';
import dataPoints from './modules/dataPoints';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dataPoints
  }
});