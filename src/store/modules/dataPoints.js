

const state = {
  dataPoints: [
    {
      country: 'HRV',
      period: 1,
      dataType: 'pr',
      data: [
        {
          model: 'model1',
          viewType: 'mavg',         
          values: [9.5, 11.1, 13.2, 15.2, 9.1, 6.5, 7.8, 7.5, 11.1, 11.2, 15.2, 9.1]
        },
        {
          model: 'model2',
          viewType: 'mavg',     
          values: [10.5, 13.1, 10.2, 11.2, 8.1, 5.5, 7.8, 10.5, 9.1, 13.2, 13.2, 5.1]
        }
      ]
    },
    {
      country: 'HRV',
      period: 2,
      dataType: 'pr'
      data: [
        {
          model: 'model3',
          viewType: 'mavg',        
          values: [10.5, 8.1, 11.2, 15.2, 10.1, 6.5, 7.8, 11.1, 10.1, 13.2, 9.2, 8.1]
        }
      ]
    }
  ]
};

const getters = {
  allDataPoints: (state) => state.dataPoints
};

const actions = {
  
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};