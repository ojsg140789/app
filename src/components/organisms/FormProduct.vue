<template>
    <v-form @submit.prevent="submitForm">
        <v-text-field v-model="localProduct.name" label="Nombre" required />
        <v-text-field v-model="localProduct.price" label="Precio" type="number" required />
        <v-btn type="submit" color="primary">Guardar</v-btn>
    </v-form>
    FileName: {{ fileName }}
</template>

<script>
import dataService from '@/services/dataService';
export default {
    name: 'FormProduct',
    props: {
        id: String
    },
    data() {
        return {
            localProduct: {
                id: '',
                name: '',
                fileName: '',
                price: ''
            },
            fileName: '',
            fileType: '',
            fileSize: ''
        };
    },
    created () {
        if(this.id) {
            this.getProduct();
        }
    },
    methods: {
        async getProduct(){
            let _items = await dataService.get(this.id);
            let _product = _items.data;
            this.localProduct =  { 
                ..._product
            };
            if(this.localProduct.fileName) {
                let _fileName = this.localProduct.fileName.split(" ");
                this.fileName = _fileName[0];
                this.fileType = _fileName[1];
                this.fileSize = _fileName[2];
            } else {
                this.localProduct.fileName = "";
            }
        },
        submitForm() {
            if(this.localProduct.id) {
                this.saveChanges();
            } else {
                this.createProduct();
            }
        },
        saveFile(){
            this.saveChanges();
        },
        async createProduct() {
            await dataService.create(this.localProduct);
            this.$emit('submit-product');
        },
        async saveChanges() {
            await dataService.update(this.localProduct.id, this.localProduct);
            this.$emit('submit-product');
        }
    }
};
</script>

<style scoped></style>