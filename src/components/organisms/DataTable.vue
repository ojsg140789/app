<template>
  <v-row justify="end">
    <v-col cols="auto">
      <v-btn variant="outlined" @click="goToProductForm()">
        Agregar Producto
      </v-btn>
    </v-col>
  </v-row>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="me-2" size="small" @click="goToProductForm(item.id)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.id)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import dataService from '@/services/dataService';

export default {
  name: 'DataTable',
  data() {
    return {
      headers: [
        { title: 'Name', key: 'name' },
        { title: 'Price', key: 'price' },
        { title: 'FileName', key: 'fileName' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      items: [],
    };
  },
  async created() {
    this.getAll();
  },
  methods: {
    async getAll() {
      try {
        let _items = await dataService.getAll();
        this.items = _items.data;
      } catch (error) {
        console.error('Error loading data', error);
      }
    },
    async goToProductForm(id) {
      this.$router.push({ name: 'Product', params: { id: id } });
    },
    async deleteItem(id) {
      try {
        await dataService.delete(id);
        this.getAll();
      } catch (error) {
        console.error('Error loading data', error);
      }
    },
  }
};
</script>

<style scoped></style>