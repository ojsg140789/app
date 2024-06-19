<template>
    <v-container>
        <form-product />
        Params {{ id }}
    </v-container>
</template>

<script>
import FormProduct from '@/components/organisms/FormProduct.vue';

export default {
    name: 'Product',
    props: {
        id: String
    },
    components: {
        FormProduct,
    },
    created () {
      console.log(this.id,);
    },
};
</script>

<style scoped></style>