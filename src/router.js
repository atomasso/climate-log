import Vue from 'vue';
import Router from 'vue-router';
import TableView from '@/components/TableView';
import ChartView from '@/components/ChartView';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TableView',
      component: TableView
    },
    {
      path: '/chart',
      name: 'ChartView',
      component: ChartView
    }
  ]
})
