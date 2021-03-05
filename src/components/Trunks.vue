<template>
  <div class="extensions" >

    <div v-if="preloader"  class="dm-overlay"

         style="text-align: center;border:0px red solid; position: absolute;
                z-index: 999999; width: 100%; margin: 0px auto 0px auto; height: 100%" >
      <div style="font-style: italic; color:white; margin-top:20px;">Подождите, идет сохранение ...</div>
      <div><md-progress-spinner md-mode="indeterminate"></md-progress-spinner></div>

    </div>

    <md-toolbar class="md-theme-default" md-elevation="1">

      <md-button @click="addItem" class="md-raised">Добавить</md-button>
      <md-button @click="showJson = !showJson" class="md-raised">Show Json</md-button>

    </md-toolbar>

    <pre v-if="showJson" style="text-align: left" >{{items}}</pre>

    <md-list >
      <md-list-item v-for="(item, i) in items" :key="i"  >

        <img :id="'user-' + item.name"
             src="https://192.168.3.187/admin-lte/assets/img/item_icons/queue.svg"
             style="width: 40px; cursor: pointer; margin-left: 10px;"
             draggable="true"
             @dragstart="dragStart($event)"
             @dragend="dragEnd($event, item, 'user')" title="Перенести"  >

        <div style="display:block; text-align: left; border: 1px gainsboro solid; margin:5px; padding:7px; cursor:pointer"
             @click="editItem(item)" title="редактировать"  >
             {{ item.name }}  ({{ item.trunk_name }})
        </div>

        <code @click="deleteItem(item)"
              style="border:1px red solid; padding:7px; cursor:pointer" title="удалить" >
          {{ item.trunk_name }}</code>

      </md-list-item>
    </md-list>

    <!--Модальная форма ---->
    <ModalForm
        :data="model"
        btn_title="Добавить"
        title="Форма редактирования"
        @save="save"
    ></ModalForm>
    <!-------------------->

  </div>
</template>

<script>

import ModalForm from '@/components/ModalForm'

export default {

  name: 'Queues',
  props: ['items'],
  data: () => ({
    showJson   : false,
    preloader  : false,
    showDialog : false,
    saveStatus : '',
    users      : [],
    item       : {},
    url        : 'trunks',

    saveParam  : {
      url    : '/trunks',
      method : '',
      data   : null,
      fn     : null,
    },

    model : {

      name: {
        title: 'Имя внешнего номера',
        value: '',
        type: 'text',
      },

      trunk_name: {
        title: 'Номер',
        value: '',
        type: 'text',
      },

    },

  }),

  created() {
    this.setApiUrl();
    this.jwtAuth();
  },

  components: {
    ModalForm,
  },

  methods: {

  },

  mounted() {
    setTimeout( () => {
      this.fetchData(this.url);
    }, 2000);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
