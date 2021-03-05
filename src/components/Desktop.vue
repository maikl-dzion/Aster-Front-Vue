<template>
  <div class="desktop">

    <!--      <pre style="text-align: left">{{dragElements}}</pre>-->

    <template v-for="(param) in dragElements">
      <template v-if="param.type == 'user'">

        <div class="drag-item"
             :key="param.item.extension"
             :style="'left:' + param.pos.x +'px; top:' +param.pos.y+ 'px;'"
             draggable="true"
             @dragstart="dragStart($event)"
             @dragend="dragEnd($event, param)" >

               <div>{{ param.item.extension }}</div>
               <div>{{ param.type }}</div>

        </div>
      </template>
    </template>

  </div>
</template>

<script>

export default {

  name: 'Desktop',
  //------------
  data: () => ({
    dragElements: [],
  }),

  created() {
  },
  components: {},

  //------------
  methods: {

    addElement(data) {
      this.dragElements.push(data);
    },

    dragStart(event) {
      console.log(event);
    },

    dragEnd(event, param) {
        param.pos.x = event.x;
        param.pos.y = event.y;
    },

  },

  mounted() {
    this.getEventBus('drag-end-event', this.addElement)
  }

}
</script>

<style scoped lang="scss">

.drag-item {
  position: absolute;
  border: 2px red solid;
  border-radius: 20%;
  width: 50px;
  height: 50px;
  left: 0px;
  top: 0px;
}

</style>
