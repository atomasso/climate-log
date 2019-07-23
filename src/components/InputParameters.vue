<template>
  <div>
    <fieldset>
      <legend>Select country</legend>
      <div class="form-group col-xs-4">
        <select class="custom-select">
          <option selected="" value="HRV">Croatia</option>
          <option value="SVN">Slovenia</option>
          <option value="SRB">Serbia</option>
          <option value="BIH">Bosnia and Herzegovina</option>
          <option value="MNE">Montenegro</option>
          <option value="MKD">Macedonia</option>
          <option value="YUG">Yugoslavia</option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <legend>Select period</legend>
      <div class="form-group md-6">
        <select class="custom-select">
          <option selected="" value="1">1920-1939</option>
          <option value="2">1940-1959</option>
          <option value="3">1960-1979"</option>
          <option value="4">1980-1999</option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <legend>Select measurement type</legend>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input type="radio" id="temperature" value="temperature" name="customRadio" v-model="viewType" class="custom-control-input" checked="checked">
          <label class="custom-control-label" for="temperature" @click="setViewType('temperature')">Temperature</label> 
        </div>
        <div class="custom-control custom-radio">        
          <input type="radio" id="precipitation" value="precipitation" name="customRadio" v-model="viewType" class="custom-control-input" checked="">
          <label class="custom-control-label" for="precipitiation" @click="setViewType('precipitation')">Precipitation</label>
        </div>
      </div>
    </fieldset>  
  </div>
</template>

<script>
export default {
  props: ['viewType'],
  data() {
    return {}
  },
  methods: {
    setViewType(viewType) {
      this.$emit('changeViewType', viewType);
    }
  }
}
</script>

<style>
</style>