<template>
  <div class="container main">
    <h2>Chart View</h2>
    <br>    
    <InputParameters
      @changeDataType="updateDataType($event)"
      @changePeriod="updatePeriod($event)" 
      @changeCountry="updateCountry($event)" 
    />
    <br>
    <h5 v-if="dataType === 'tas'">Chart with temperature data in degrees Celsius</h5>
    <h5 v-else>Chart with precipitation data in millimeters values</h5>
    <BarChart :chart-data="datacollection"/>
    <br>
    <button type="button" class="btn btn-primary" @click="showModal">Insert Data</button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <div slot="modal-header">
        <h5 class="modal-title">Create new data point - Annual average</h5>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">New custom model name</label>
          <input type="text" class="form-control" placeholder="e.g. My best model" id="customModel" v-model="newDataPoint">
        </div>
      </div>
      <!-- modal input section for temperature values -->
      <div v-if="dataType === 'tas'" slot="modal-body">
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual temperature average, in degrees Celsius</label>
          <input type="text" class="form-control" id="customModel" v-model="userInput">
        </div>
      </div>
      <!-- modal input section for precipitation values -->
      <div v-else slot="modal-body">       
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual precipitation average, in degrees Celsius</label>
          <input type="text" class="form-control" id="customModel" v-model="userInput">
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
import InputParameters from '@/components/InputParameters';
import APIService from '@/APIService';
import BarChart from '@/BarChart';
import { dataPointsStore } from '@/store/modules/dataPointsStore';

export default {
  name: '',
  components: {
    Modal,
    InputParameters,
    BarChart
  },
  data() {
    return {
      apiResponse: [],
      userInput: '',
      isModalVisible: false,
      dataType: 'tas',
      startPeriod: '1920',
      endPeriod: '1939',
      country: 'HRV',
      newDataPoint: '',
      datacollection: null
    }
  },
  methods: {   
    insertData() {
      // insert data to store
      dataPointsStore.addDataPoint(this.newDataPoint, this.country, this.startPeriod, this.endPeriod, 'annualavg', this.dataType, Number(this.userInput));
      
      // insert data to local array for display
      this.apiResponse.push({
        gcm: this.newDataPoint,
        variable: this.dataType,
        fromYear: this.startPeriod,
        toYear: this.endPeriod,
        annualData: Number(this.userInput)
      });
 
      this.closeModal();
    },
    updateDataType(updatedType) {
      this.dataType = updatedType;
    },
    updatePeriod(updatedType) {
      this.dataType = updatedType;
    },
    updateCountry(updatedType) {
      this.dataType = updatedType;
    },
    showModal() {
      this.isModalVisible = true;
      this.newDataPoint = '';
      // When the modal is shown, we want a fixed body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    },
    closeModal() {
      this.isModalVisible = false;
      // When the modal is hidden, we want to remain at the top of the scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  },
  async created() {  
    this.apiResponse = await APIService.fetchData(this.country, this.startPeriod, this.endPeriod, 'annualavg', this.dataType);

    const labels = this.apiResponse.map(element => {
      return element.gcm;
    });

    const data = this.apiResponse.map(element => {
      return element.annualData;
    });

    this.datacollection = {      
      labels,     
      datasets: [
        {
          label: this.dataType === 'tas' ? 'Temperature' : 'Precipitation',
          backgroundColor: '#f87979',
          data
        }
      ]
    };
  }
}
</script>

<style>
.main {
  padding: 40px;
}
</style>
