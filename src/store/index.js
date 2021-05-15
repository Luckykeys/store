import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
Vue.use(Vuex);

const state = {};
const actions = {};
const mutations = {};
const getters = {};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules,
});

export default store;
