export const dataPointsStore = {
  state: {
  dataPoints: [
    {
      country: 'HRV',
      startPeriod: '1920',
      endPeriod: '1939',
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
      startPeriod: '1920',
      endPeriod: '1939',
      dataType: 'pr',
      data: [
        {
          model: 'model3',
          viewType: 'mavg',        
          values: [10.5, 8.1, 11.2, 15.2, 10.1, 6.5, 7.8, 11.1, 10.1, 13.2, 9.2, 8.1]
        }
      ]
    }
  ]
  },
  fetchDataPoints() {
    return this.state.dataPoints;
  }
};

