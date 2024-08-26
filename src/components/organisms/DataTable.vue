<template>
  <v-toolbar-title class="custom-title">Lista de Productos</v-toolbar-title>
  <v-row justify="end">
    <v-col cols="auto">
      <v-btn variant="outlined" to="/tree">
        Ir a Componente Estructura Árbol
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn variant="outlined" @click="goToProductForm()">
        Agregar Producto
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-btn variant="outlined" @click="exportToExcel()">
        Exportar
      </v-btn>
    </v-col>
  </v-row>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:[`item.price`]="{ item }">
      ${{ item.price }}
    </template>
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
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un problema al obtener los datos"
        });
      }
    },
    async goToProductForm(id) {
      this.$router.push({ name: 'Product', params: { id: id } });
    },
    async deleteItem(id) {
      Swal.fire({
        title: "Eliminar",
        text: "¿Eliminar producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dataService.delete(id);
            this.getAll();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Ocurrió un problema al eliminar el producto"
            });
          }
        }
      });
    },
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.items);

      XLSX.utils.sheet_add_aoa(worksheet, [['ID', 'Name', 'Price', 'FileName']], { origin: 'A1' });

      worksheet['!cols'] = [
        { wpx: 200 },
        { wpx: 300 },
        { wpx: 300 },
        { wpx: 300 }
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

      const range = XLSX.utils.decode_range(worksheet['!ref']);
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ c: C, r: R });
          if (!worksheet[cellAddress]) continue;
          worksheet[cellAddress].s = {
            font: { name: "Arial", sz: 12, bold: R === 0, color: { rgb: R === 0 ? "FFFFFF" : "000000" } },
            fill: { fgColor: { rgb: R === 0 ? "4F81BD" : "FFFFFF" } },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } }
            },
            alignment: { horizontal: "center", vertical: "center" }
          };
        }
      }

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(data, 'reporte.xlsx');
    },
  }
};
</script>

<style scoped>
.custom-title {
  font-size: 24px;
  font-weight: bold;
}
</style>