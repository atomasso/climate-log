<template>
  <div class="container main">
    <h2>Table View</h2>
    <br>    
    <InputParameters
      @changeDataType="updateDataType($event)"
      @changePeriod="updatePeriod($event)" 
      @changeCountry="updateCountry($event)" 
    />
    <br>
    <h5 v-if="dataType === 'tas'">Table with temperature data in degrees Celsius</h5>
    <h5 v-else>Table with precipitation data in millimeters values</h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">GCM</th>
          <th scope="col"
            v-for="(month, index) in months"
            v-bind:key="index"
          >
            {{ month }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- data from API -->
        <tr class="table-danger"
          v-for="(item, index1) in apiResponse"
          :key="index1"
        >
          <th scope="row">{{ index1 + 1 }}</th>
          <th scope="row">{{ item.gcm }}</th>
          <td
            v-for="(monthVal, index2) in item.monthVals"
            :key="index2"
          >
            {{ monthVal.toFixed(5) }}
          </td>
        </tr>
        <!-- data from local store -->
        <!-- <tr class="table-success"
          v-for="(item, index3) in filteredDataPoints"
          :key="index3"
        >
          <th scope="row">{{ index3 + 16 }}</th>
          <th scope="row">{{ item.gcm }}</th>
          <td
            v-for="(monthVal, index4) in item.monthVals"
            :key="index4"
          >
            {{ monthVal.toFixed(5) }}
          </td>
        </tr> -->
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="showModal">Insert Data</button>
    <Modal v-show="isModalVisible" @insert="insertData" @close="closeModal">
      <div slot="modal-header">
        <h5 class="modal-title">Create new data point - Monthly average</h5>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">New custom model name</label>
          <input type="text" class="form-control" placeholder="e.g. My best model" id="customModel" v-model="newDataPoint">
        </div>
      </div>
      <!-- modal input section for temperature values -->
      <div v-if="dataType === 'tas'" slot="modal-body">
        <p>Insert monthly temperature average, in degrees Celsius</p>
        <div
          v-for="(month, index) in months"
          :key="index"
          class="input-group mb-3"
        >
          <div class="input-group-prepend">
            <span class="input-group-text" id="">{{ month }}</span>
          </div>
          <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="temperatureInputs[index]">
        </div>
      </div>
      <!-- modal input section for precipitation values -->
      <div v-else slot="modal-body">
        <p>Insert monthly precipitation average, in millimeters</p>
        <div
          v-for="(month, index) in months"
          :key="index"
          class="input-group mb-3"
        >
          <div class="input-group-prepend">
            <span class="input-group-text" id="">{{ month }}</span>
          </div>
          <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import APIService from '@/APIService';
import Modal from '@/components/Modal';
import InputParameters from '@/components/InputParameters';
import { dataPointsStore } from '@/store/modules/dataPointsStore';

export default {
  name: 'TableView',
  components: {
    Modal,
    InputParameters
  },
  data() {
    return {
      temperatureInputs: [],
      apiResponse: [],    
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      isModalVisible: false,
      dataType: 'tas',
      startPeriod: '1920',
      endPeriod: '1939',
      country: 'HRV',
      newDataPoint: ''
    }
  },
  computed: {
    
  },
  methods: {   
    insertData() {
      // convert string array to number array
      const tempInputs = this.temperatureInputs.map(element => {
        return Number(element);
      });

      // insert data to store
      dataPointsStore.addDataPoint(this.newDataPoint, this.country, this.startPeriod, this.endPeriod, 'mavg', this.dataType, tempInputs);

      // insert data to local array for display
      this.apiResponse.push({
        gcm: this.newDataPoint,
        variable: this.dataType,
        fromYear: this.startPeriod,
        toYear: this.endPeriod,
        monthVals: tempInputs
      });
 
      this.closeModal();
    },
    async updatePeriod(updatedPeriod) {
      this.startPeriod = updatedPeriod[0];
      this.endPeriod = updatedPeriod[1];
     
      this.apiResponse = await APIService.fetchData(this.country, this.startPeriod, this.endPeriod, 'mavg', this.dataType);
     
      const dataPoints = dataPointsStore.fetchDataPoints();        
      this.pushNewDataPoints(dataPoints); 
    },
    async updateCountry(updatedCountry) {
      this.country = updatedCountry;

      this.apiResponse = await APIService.fetchData(this.country, this.startPeriod, this.endPeriod, 'mavg', this.dataType);
     
      const dataPoints = dataPointsStore.fetchDataPoints();        
      this.pushNewDataPoints(dataPoints); 
    },    
    async updateDataType(updatedType) {
      this.dataType = updatedType;

      this.apiResponse = await APIService.fetchData(this.country, this.startPeriod, this.endPeriod, 'mavg', this.dataType);
     
      const dataPoints = dataPointsStore.fetchDataPoints();        
      this.pushNewDataPoints(dataPoints); 
    },
    pushNewDataPoints(dataPoints) {
      dataPoints.forEach(element => {    
        if (element.country === this.country && element.startPeriod ===   this.startPeriod && element.endPeriod === this.endPeriod && element.dataType === this.dataType) {
          element.data.forEach(dataPoint => {
            this.apiResponse.push({
              gcm: dataPoint.model,
              variable: element.dataType,
              fromYear: this.startPeriod,
              toYear: this.endPeriod,
              monthVals: dataPoint.values
            });
          });        
        }
      });  
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
    this.apiResponse = await APIService.fetchData(this.country, this.startPeriod, this.endPeriod, 'mavg', this.dataType);

    const dataPoints = dataPointsStore.fetchDataPoints();        
    this.pushNewDataPoints(dataPoints);      
  }
}
</script>

<style>
.main {
  padding: 40px;
}

input.form-control {
  width: 50%;
}
</style>
