<template>
  <v-app>
    <v-main>
      <data-table />
    </v-main>
  </v-app>
</template>

<script>
import DataTable from '@/components/organisms/DataTable.vue';

export default {
  name: 'App',

  components: {
    DataTable,
  },

  data: () => ({
    //
  }),
}
</script>
