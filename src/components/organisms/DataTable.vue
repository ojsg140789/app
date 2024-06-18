<template>
    <v-card>
      <v-card-title>Productos</v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </template>
  
  <script>
  import { getData } from '@/services/dataService';
  
  export default {
    name: 'DataTable',
    data() {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Price', value: 'price' },
          { text: 'FileName', value: 'fileName' },
        ],
        items: [],
      };
    },
    async created() {
      try {
        this.items = await getData();
      } catch (error) {
        console.error('Error loading data', error);
      }
    },
  };
  </script>
  
  <style scoped>
  </style>
  