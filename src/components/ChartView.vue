<template>
  <div class="container main">
    <h2>Chart View</h2>
    <br>    
    <InputParameters :viewType="viewType" @changeViewType="updateViewType($event)" />
    <button type="button" class="btn btn-primary" @click="showModal">Insert Data</button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <div slot="modal-header">
        <h5 class="modal-title">Create new data point - Annual average</h5>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">New custom model name</label>
          <input type="text" class="form-control" placeholder="e.g. My best model" id="customModel" v-model="newDataPoint">
        </div>
      </div>
      <div v-if="viewType === 'tas'" slot="modal-body">
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual temperature, in degrees Celsius</label>
          <input type="text" class="form-control" placeholder="e.g. 12.5" id="inputDefault">
        </div>
      </div>
      <div v-else slot="modal-body">
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual precipitation, in millimeters </label>
          <input type="text" class="form-control" placeholder="e.g. 915.34" id="inputDefault">
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal';
import InputParameters from '@/components/InputParameters';
import APIService from '@/APIService';

export default {
  name: '',
  components: {
    Modal,
    InputParameters
  },
  data() {
    return {
      isModalVisible: false,
      viewType: 'tas',
      period: 1,
      country: 'Croatia'
    }
  },
  methods: {   
    updateViewType(updatedType) {
      this.viewType = updatedType;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  async created() {
    let startPeriod = '';
    let endPeriod = '';    
    switch (this.period) {
      case 1:
        startPeriod = '1920';
        endPeriod = '1939';
        break;
      case 2: 
        startPeriod = '1940';
        endPeriod = '1959';
        break;
      case 3: 
        startPeriod = '1960';
        endPeriod = '1979';
        break;
      case 4: 
        startPeriod = '1980';
        endPeriod = '1999';
        break;
    }
    this.apiResponse = await APIService.fetchData(this.country, startPeriod, endPeriod, 'annualavg', this.viewType);
  }
}
</script>

<style>
.main {
  padding: 40px;
}
</style>
