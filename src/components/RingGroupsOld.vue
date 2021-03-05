<template>
  <div class="ring-groups">
<!--    <pre>{{items}}</pre>-->
    <md-list>
       <md-list-item v-for="(item) in items" :key="item.grpnum">
          {{item.description}} <code>{{item.grpnum}}</code>
       </md-list-item>
    </md-list>

  </div>
</template>

<script>

export default {
  name: 'RingGropus',
  props: ['items'],
  data: () => ({

  }),

  created() { },

  methods : {

  },

}

</script>

<style scoped lang="scss">

</style>
