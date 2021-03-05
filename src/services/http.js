
import axios from 'axios'

export default {

    data () {
       return {
           host    : 'https://192.168.3.187',
           apiPath : '/pbxapi',
           apiUrl  : '',

           jwtToken: false,
           authData: {
               'user'    : 'admin',
               'password': 'St969FMetido',
           },
       }
    },

    created() {
        this.setApiUrl();
    },

    methods: {

        setApiUrl(path = null) {
            const url  = (!path)  ? this.apiPath : path;
            this.apiUrl = this.host + url;
        },

        getApiUrl(url, path = null) {
            if(path)
              this.setApiUrl(path);
            return this.apiUrl + url;
        },

        // JWT Авторизация
        async jwtAuth() {

            let jwtToken = false;
            const url    = '/authenticate';
            const data   = this.authData;
            const apiUrl = this.apiUrl + url;
            let response = [];

            try {
                response = await await axios.post(apiUrl, data);
            } catch (err) {
                console.log(response);
                console.log(err, 'ERROR:HTTP-SEND:');
                alert('Не удалось выполнить запрос к серверу (JWT AUTH)' + err.toString());
                return false;
            }

            if (response.data && response.data.access_token) {
                jwtToken = response.data.access_token;
            } else {
                alert('Не удалось получить токен');
                return false;
            }

            this.jwtToken = jwtToken;
            return jwtToken;

        },

        getHeaders() {
            const jwtToken = this.jwtToken;
            const headers = {
                'Authorization': 'Bearer ' + jwtToken,
                'Content-Type' : 'application/json',
            };
            return { headers };
        },

        async http(param) {

            // if(!this.jwtAuth()) return false;

            const apiUrl = this.getApiUrl(param.url);
            let options  = this.getHeaders();
            let response = [];
            let method = 'get';
            if(param.method)
                method = param.method;

            try {
                if (!param.data) {
                     response = await axios[method](apiUrl, options);
                } else {
                    response = await axios[method](apiUrl, param.data, options);
                }
            } catch (e) {
                alert('Не удалось выполнить запрос к серверу (HTTP)' + e);
                console.log(e, 'ERROR:HTTP-SEND:');
                return false;
            }

            const result = response.data;

            if (param.fn)
                param.fn(result);

            return result;
        },

    },
};