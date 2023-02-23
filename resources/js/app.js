import './bootstrap';
import {createApp} from "vue/dist/vue.esm-bundler.js";

import ComponentVue from './components/ComponentVue.vue';
import BuyProduct from './components/BuyProduct.vue';

createApp({
    components: {
        'component-vue': ComponentVue,
        'buy-product': BuyProduct,
    }
}).mount('#app');
