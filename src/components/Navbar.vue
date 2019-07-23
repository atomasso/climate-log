<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand" href="#">Climate Log</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarColor03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="">
            <router-link :to="{ name: 'TableView' }">
              Table
            </router-link> 
          </a>       
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <router-link :to="{ name: 'ChartView' }">
              Chart
            </router-link> 
          </a>    
        </li>
      </ul>
    </div>
  </nav>
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
