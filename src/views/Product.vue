<template>
    <v-container>
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

<style scoped></style>