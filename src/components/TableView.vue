<template>
  <div class="container main">
    <h3>Table View</h3>
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
      v-for="(item, index1) in response"
      :key="index1"
    >
      <th scope="row">({{ index1 }}) {{ item.gcm }}</th>
      <td
        v-for="(monthVal, index2) in item.monthVals"
        :key="index2"
      >
        {{ monthVal }}
      </td>
    </tr>
  </tbody>
  </table>
  <button type="button" class="btn btn-primary" @click="getData">Get Data</button>
  </div>
</template>

<script>
import APIService from '@/APIService'

export default {
  name: '',
  components: {
    
  },
  data() {
    return {
      response: [],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  methods: {
    async getData() {
      this.response = await APIService.fetchData('HRV', '1920', '1939', 'mavg', 'pr');
      console.log(this.response[0].gcm)
    }
  }
}
</script>

<style>
.main {
  padding-top: 40px;
}
</style>
