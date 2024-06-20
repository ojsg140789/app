// Styles
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VTreeview } from 'vuetify/labs/VTreeview'

export default createVuetify(
  {
    components: {
      VTreeview,
    },
    icons: {
      defaultSet: 'mdi',
    },
  },
  components,
  directives,
)
