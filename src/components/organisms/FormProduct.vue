<template>
    <v-form @submit.prevent="submitForm" class="ma-4">
        <v-text-field v-model="localProduct.name" label="Nombre" required />
        <v-text-field v-model="localProduct.price" label="Precio" type="number" required />
        <v-btn type="submit" color="primary">Guardar</v-btn>
    </v-form>
    <template v-if="localProduct.id && localProduct.fileName">
        <v-row class="ma-4">
            <v-col cols="auto">
                <p>Nombre del archivo: {{ fileName }}</p>
                <p>Tipo de archivo: {{ fileType }}</p>
                <p>Tamaño del archivo: {{ fileSize }} Bytes</p>
            </v-col>
        </v-row>
    </template>
    <template v-if="localProduct.id && !localProduct.fileName">
        <v-row class="ma-4">
            <v-file-input v-model="file" label="Archivo" @change="onFileChange(file)"></v-file-input>
        </v-row>
    </template>
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
            fileSize: '',
            file: ''
        };
    },
    created() {
        if (this.id) {
            this.getProduct();
        }
    },
    methods: {
        async getProduct() {
            let _items = await dataService.get(this.id);
            let _product = _items.data;
            this.localProduct = {
                ..._product
            };
            if (this.localProduct.fileName) {
                let _fileName = this.localProduct.fileName.split("/");
                this.fileName = _fileName[0];
                this.fileType = _fileName[1];
                this.fileSize = _fileName[2];
            } else {
                this.localProduct.fileName = "";
            }
        },
        submitForm() {
            if (this.localProduct.id) {
                this.saveChanges();
            } else {
                this.createProduct();
            }
        },
        async createProduct() {
            await dataService.create(this.localProduct);
            this.$emit('submit-product');
        },
        async saveChanges() {
            await dataService.update(this.localProduct.id, this.localProduct);
            this.$emit('submit-product');
        },
        async saveFile() {
            if (!this.file) return;

            const formData = new FormData();
            formData.append('file', this.file);
            try {
                const response = await dataService.saveFile(formData);
                this.fileName = response.data.name;
                this.fileType = response.data.extension;
                this.fileSize = response.data.size;
                this.localProduct.fileName = this.fileName + '/' + this.fileType + '/' + this.fileSize;
                await dataService.update(this.localProduct.id, this.localProduct);
            } catch (error) {
                console.error('Error subiendo el archivo:', error);
            }
        },
        onFileChange(file) {
            this.file = file;
            this.saveFile();
        },
    }
};
</script>

<style scoped></style>