<template>
  <div class="container main">
    <h2>Chart View</h2>
    <br>    
    <InputParameters :viewType="viewType" @changeViewType="updateViewType($event)" />
    <button type="button" class="btn btn-primary" @click="showModal">Insert Data</button>
    <Modal v-show="isModalVisible" @close="closeModal">
      <div slot="modal-header">
        <h5 class="modal-title">Enter new data point - annual average</h5>
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">New custom model name</label>
          <input type="text" class="form-control" placeholder="e.g. My best model" id="customModel">
        </div>
      </div>
      <div v-if="viewType === 'temperature'" slot="modal-body">
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual temperature</label>
          <input type="text" class="form-control" placeholder="e.g. 12.5" id="inputDefault">
        </div>
      </div>
      <div v-else slot="modal-body">
        <div class="form-group">
          <label class="col-form-label" for="inputDefault">Insert annual precipitation </label>
          <input type="text" class="form-control" placeholder="e.g. 915.34" id="inputDefault">
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import InputParameters from '@/components/InputParameters'

export default {
  name: '',
  components: {
    Modal,
    InputParameters
  },
  data() {
    return {
      isModalVisible: false,
      viewType: 'temperature'
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
}
</script>

<style>
.main {
  padding-top: 40px;
}
</style>
