<template>
  <div class="container main">
    <h2>Table View</h2>
    <br>    
    <InputParameters />  
    <table class="table table-hover">
      <thead>
        <tr>
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
        <tr class="table-active"
          v-for="(item, index1) in apiResponse"
          :key="index1"
        >
          <th scope="row">{{ item.gcm }}</th>
          <td
            v-for="(monthVal, index2) in item.monthVals"
            :key="index2"
          >
            {{ monthVal }}
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="showModal">Insert Data</button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <div slot="modal-header">
        <h5 class="modal-title">Enter new data point- monthly average</h5>
      </div>
      <div v-if="temperatureView" slot="modal-body">
        <input>
      </div>
      <div v-else slot="modal-body">
        <input>
      </div>
    </Modal>
  </div>
</template>

<script>
import APIService from '@/APIService';
import Modal from '@/components/Modal';
import InputParameters from '@/components/InputParameters';

export default {
  name: 'TableView',
  components: {
    Modal,
    InputParameters
  },
  data() {
    return {
      apiResponse: [],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      isModalVisible: false,
      temperatureView: true
    }
  },
  methods: {   
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  async created() {
    this.apiResponse = await APIService.fetchData('HRV', '1920', '1939', 'mavg', 'tas');
  }
}
</script>

<style>
.main {
  padding-top: 40px;
}
.modalDisplayed {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
