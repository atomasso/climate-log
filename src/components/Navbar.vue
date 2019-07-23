<template>
  <div class="nav-bar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'TableView' }">
          <span class="nav-title">Table</span>
        </router-link> 
        <router-link :to="{ name: 'ChartView' }">
          <span class="nav-title">Chart</span>
        </router-link>        
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
    
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
