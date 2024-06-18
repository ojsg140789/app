<template>
    <v-container>
        <form-product />
        Params {{ productId }}
    </v-container>
</template>

<script>
import FormProduct from '@/components/organisms/FormProduct.vue';

export default {
    name: 'Product',
    computed: {
    productId() {
            return this.$route.params.id;
        }
    },
    components: {
        FormProduct,
    },
};
</script>

<style scoped></style>