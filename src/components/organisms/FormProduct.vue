<template>
    <v-form ref="form" v-model="isFormValid" @submit.prevent="submitForm" class="ma-4">
        <v-text-field 
            v-model="localProduct.name" 
            label="Nombre" 
            required 
            :rules="[nameRequiredRule, nameMaxLengthRule]"
        />
        <v-text-field 
            v-model="localProduct.price" 
            label="Precio" 
            type="number" 
            required 
            prepend-icon="mdi-currency-usd" 
            :rules="[priceRequiredRule, priceMaxLengthRule]"
        />
        <v-btn :disabled="!isFormValid" type="submit" color="primary">Guardar</v-btn>
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
import Swal from 'sweetalert2';
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
            file: '',
            isFormValid: false,
            nameRequiredRule: value => !!value || 'Nombre es requerido',
            nameMaxLengthRule: value => value.length <= 100 || 'Nombre debe ser menor a 50 caracteres',
            priceRequiredRule: value => !!value || 'Precio es requerido',
            priceMaxLengthRule: value => value <= 999999999999999999 || 'Precio debe ser menor a $999,999,999,999,999,999',
        };
    },
    created() {
        if (this.id) {
            this.getProduct();
        }
    },
    methods: {
        async getProduct() {
            try {
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
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un problema al obtener el producto"
                });
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
            try {
                if (this.$refs.form.validate()) {
                await dataService.create(this.localProduct);
                this.$emit('submit-product');
            }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un problema al guardar el producto"
                });
            }
        },
        async saveChanges() {
            try {
                if (this.$refs.form.validate()) {
                await dataService.update(this.localProduct.id, this.localProduct);
                this.$emit('submit-product');
            }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un problema al guardar el producto"
                });
            }
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
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió al guardar el archivo"
                });
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
