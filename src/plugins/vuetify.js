// Styles
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify(
  {
    icons: {
      defaultSet: 'mdi',
    },
  },
  components,
  directives,
)
