<template>
  <div id="app">


    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">

        <h2 class="md-toolbar-section-start">
          Телефония
        </h2>

        <div class="top-menu">
          <router-link to="/" style="color:white" >Home</router-link>
          <span style="margin:0px 10px 0px 10px" >|</span>
          <router-link to="/about" style="color:white">About</router-link>
        </div>

        <div class="md-toolbar-section-end">
          <md-button class="md-primary" >Refresh</md-button>
<!--          <md-button class="md-primary">Create</md-button>-->
        </div>

      </div>

    </md-toolbar>

    <router-view/>

  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
