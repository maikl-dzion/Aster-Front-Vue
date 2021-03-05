<template>
  <div class="home">

    <md-toolbar class="md-theme-default" md-elevation="1">
      <md-button @click="fetchData('extensions')"  class="md-primary">Внутренние номера</md-button>
      <md-button @click="fetchData('ringgroups')"  class="md-primary">Группы</md-button>
      <md-button @click="fetchData('queues')"      class="md-primary">Очереди</md-button>
      <md-button @click="fetchData('trunks')"      class="md-primary">Внешние номера</md-button>
    </md-toolbar>

    <div class="constructor-page-container">

      <div class="LeftPanel">
          <div v-if="itemType == 'extensions'">
              <Extensions :items="items"/>
          </div>
          <div v-else-if="itemType == 'ringgroups'">
              <RingGroups :items="items"/>
          </div>
          <div v-else-if="itemType == 'queues'">
              <Queues :items="items"/>
          </div>
          <div v-else-if="itemType == 'trunks'">
              <Trunks :items="items"/>
          </div>
      </div>

      <div class="CenterPanel">
          <Desktop></Desktop>
      </div>

    </div>

    <DialogInfoPanel/>

  </div>
</template>

<script>
// @ is an alias to /src
import Extensions from '@/components/Extensions.vue'
import RingGroups from '@/components/RingGroups.vue'
import Queues from '@/components/Queues.vue'
import Trunks from '@/components/Trunks.vue'
import Desktop from '@/components/Desktop.vue'
import DialogInfoPanel from '@/components/DialogInfoPanel'

export default {
  name: 'Home',
  data: () => ({
      itemType    : 'extensions',
      items       : [],
      coreElements: [],
  }),

  created() {
    this.setApiUrl();
    this.jwtAuth();
  },

  components: {
      Extensions,
      RingGroups,
      Queues,
      Trunks,
      Desktop,
      DialogInfoPanel,
  },

  methods: {

      openModule(type) {
         this.itemType = type;
      },

  },

  mounted() {
       setTimeout( () => {
          this.fetchData('extensions');
       }, 2000);
  }

}
</script>

<style lang="scss" scoped>

.constructor-page-container {
  display: flex;
  border: 0px red solid;
  padding: 3px;
}

.LeftPanel {
  width: 28%;
  border: 1px gainsboro solid;
}

.CenterPanel {
  width: 72%;
  border: 1px gainsboro solid;
}

</style>
