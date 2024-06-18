<template>
  <v-container>
    <data-table />
  </v-container>
</template>

<script>
import DataTable from '@/components/organisms/DataTable.vue';

export default {
  name: 'Home',
  components: {
    DataTable,
  },
};
</script>

<style scoped></style>