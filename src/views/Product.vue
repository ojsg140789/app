<template>
    <v-container>
        <v-toolbar-title class="custom-title">Producto</v-toolbar-title>
        <form-product 
        :id="id"
        @submit-product="handleProductSubmit" />
    </v-container>
</template>

<script>
import FormProduct from '@/components/organisms/FormProduct.vue'

export default {
    name: 'Product',
    data() {
        return {
            submittedProduct: {
                id: '',
                name: '',
                fileName: '',
                price: ''
            }
        };
    },
    props: {
        id: String
    },
    components: {
        FormProduct,
    },
    created () {
    },
    methods: {
        async handleProductSubmit() {
            this.$router.push({ name: 'Home'});
        }
    }
};
</script>

<style scoped>
.custom-title {
  font-size: 24px;
  font-weight: bold;
}
</style>