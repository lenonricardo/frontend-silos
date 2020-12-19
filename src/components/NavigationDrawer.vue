<template>
  <v-sheet
    height="100%"
    class="overflow-hidden"
    style="position: relative;"
  >
  <v-container class="fill-height">
		<slot></slot>
   </v-container>

   <v-navigation-drawer
      v-model="toggleDrawer"
      absolute
		:permanent="toggleDrawer"
    >
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Início', icon: 'mdi-view-dashboard' },
          { title: 'Capturar Amostra', icon: 'mdi-camera' },
          { title: 'Relatórios', icon: 'mdi-file-chart' },
        ],
      }
    },

	props: {
		drawer: { type: Boolean, required: true, default: true}
	},

	computed: {
		toggleDrawer: {
				get(){
					return this.drawer
				},
				set(newValue){
					return newValue
				}
		}
	}
  }
</script>