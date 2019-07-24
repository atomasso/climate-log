<template>
  <div>
    <fieldset>
      <legend>Select country</legend>
      <div class="form-group col-xs-4">
        <select class="custom-select" @change="setCountry($event)">
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
      <div class="form-group">
        <select class="custom-select" @change="setPeriod($event)">
          <option selected="" value="1">1920-1939</option>
          <option value="2">1940-1959</option>
          <option value="3">1960-1979</option>
          <option value="4">1980-1999</option>
        </select>
      </div>
    </fieldset>
    <fieldset>
      <legend>Select measurement type</legend>
      <div class="form-group">
        <div class="custom-control custom-radio">
          <input type="radio" id="temperature" name="customRadio" class="custom-control-input" checked="">
          <label class="custom-control-label" for="temperature" @click="setDataType('tas')">Temperature, in degrees Celsius</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" id="precipitation" name="customRadio" class="custom-control-input">
          <label class="custom-control-label" for="precipitation" @click="setDataType('pr')">Precipitation (rainfall and assumed water equivalent), in millimeters</label>
        </div>  
      </div>  
    </fieldset>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      
    }
  },
  methods: {
    setDataType(type) {
      this.$emit('changeDataType', type);
    },
    setPeriod(event) {
      let startPeriod = '';
      let endPeriod = '';
      switch (event.target.value) {
        case '1':
          startPeriod = '1920';
          endPeriod = '1939';
          break;
        case '2':
          startPeriod = '1940';
          endPeriod = '1959';
          break;
        case '3':
          startPeriod = '1960';
          endPeriod = '1979';
          break;
        case '4':
          startPeriod = '1980';
          endPeriod = '1999';
          break;
      }
      console.log(startPeriod, endPeriod);
      this.$emit('changePeriod', [startPeriod, endPeriod]);
    },
    setCountry(event) {
      this.$emit('changeCountry', event.target.value);
    }
  }
}
</script>

<style scoped>
legend {
  font-size: 1.4em;
}
fieldset {
  width: 50%;
}
</style>