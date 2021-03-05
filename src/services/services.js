import Vue from "vue";

const EventBus = new Vue();

export default {

    methods: {

        // Создать событие и отправить данные
        sendEventBus(eventName, data = null) {
            EventBus.$emit(eventName, data);
        },

        // По событию получить данные
        getEventBus(eventName, fn) {
            EventBus.$on(eventName, response => { fn(response); });
        },

        // Начало переноса
        dragStart(event) {
            console.log(event);
        },

        // Конец переноса
        dragEnd(event, item, type) {
            const pos = {
                x : event.x,
                y : event.y,
            }
            const param = { pos, item, type };
            this.sendEventBus('drag-end-event', param)
        },

        getFreePbxCore() {
            const adminLte = this.host + '/admin-lte/api';
            this.apiUrl = adminLte;
            const param = {
                url: '/index.php',
                fn: this.setCoreElements,
            };
            this.http(param);
        },

        setCoreElements(response) {
            this.coreElements = response;
        },

    },

};