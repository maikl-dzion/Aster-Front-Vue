<template>
  <div class="modal-form">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{title}}</md-dialog-title>
      <md-dialog-content>
        <template><div>

            <template v-for="(item, fieldName) in data" >

              <md-field :key="fieldName" >
                <label>{{item.title}}</label>
                <md-input v-model="item.value"></md-input>
              </md-field>

            </template>

        </div></template>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button @click="showDialog = false" class="md-primary">Отменить</md-button>
        <md-button @click="save" class="md-primary">Сохранить</md-button>
      </md-dialog-actions>

    </md-dialog>
<!--    <md-button @click="showDialog = true" class="md-raised">{{btn_title}}</md-button>-->

  </div>
</template>

<script>

export default {
  name: 'ModalForm',
  props: ['data', 'title', 'btn_title'],
  data: () => ({
     showDialog: false,
  }),

  methods : {
      save() {
        this.showDialog = false;
        this.$emit('save', this.data);
      },
  },

  mounted() {
      this.getEventBus('change-show-modal-status', show => {
         if(!show) this.showDialog = false;
         else this.showDialog = true;
      })
  }

}
</script>

<style scoped>

</style>