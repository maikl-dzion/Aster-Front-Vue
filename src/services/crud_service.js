export default {

    methods: {

        // Получение данных
        fetchData(type) {
            this.itemType = type;
            const param = {
                url    : '/' + type,
                fn : resp => { this.items = resp.results; },
            };
            this.http(param);
        },

        // Добавление
        addItem() {
            this.saveParam['url']  = '/' + this.url;
            this.saveParam['method'] = 'post';
            this.showDialog = true;
            this.sendEventBus('change-show-modal-status', this.showDialog);
        },

        // Измененние
        editItem(item) {
            this.model = this.dataConvert(this.model, item);
            this.saveParam['method'] = 'put';
            this.saveParam['url'] = '/' + this.url + '/' + item.extension;
            this.showDialog = true;
            this.sendEventBus('change-show-modal-status', this.showDialog);
        },

        // Удаление
        async deleteItem(item) {
            this.saveParam['method'] = 'delete';
            this.saveParam['url']    = '/' + this.url + '/' + item.extension;
            this.preloader = true;
            const resp = await this.http(this.saveParam);
            this.saveResponseHandle(resp);
            this.preloader = false;
        },

        // Сохранение
        async save(model) {

            let item =this.dataConvert(model, null);
            if(!item.extension)
                delete item.extension;

            if(!item.extension_list)
                item.extension_list = {};

            if(!item.name) {
                alert('Не заполнено имя');
                return false;
            }

            if(!this.jwtAuth())
                return false;

            this.preloader = true;
            this.saveParam['data'] = item;
            const resp = await this.http(this.saveParam);
            this.saveResponseHandle(resp);
            this.preloader = false;

            this.sendEventBus('open-info-panel',
                { type : 'success', message : 'Успешное сохранение', title : '', });

        },

        saveResponseHandle(resp = null) {
            console.log(resp);
            this.fetchData(this.url);
        },

        // Форматирование/Конвертирование данных
        dataConvert(model, data = null) {

            //--- для изменения существующего
            if(data) {
                for (let fname in model) {
                    if(data[fname])
                        model[fname].value = data[fname];
                }
                return model;
            }

            //--- для добавления нового
            let item = {};
            for(let fname in model) {
                item[fname] = model[fname].value;
            }
            return item;
        },

    },

};