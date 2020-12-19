<template>
	<v-app>
		<v-app-bar color="#44cc97" app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer">
			</v-app-bar-nav-icon>
			<v-toolbar-title class="headline text-uppercase">
				<v-img style="width: 110px" src="./assets/logo-sem-fundo.png"></v-img>
			</v-toolbar-title>
			<v-spacer></v-spacer>
				<v-btn icon>
					<v-icon>mdi-bell</v-icon>
				</v-btn>
		</v-app-bar>
		<v-content>
			<Drawer :drawer="drawer">
				<template>
					<router-view :class="dynamicClass"/>
				</template>
			</Drawer>
		</v-content>
	</v-app>
</template>

<script>
import Drawer from './components/NavigationDrawer.vue'

export default {
	name: 'App',
	data: () => ({
		dialog: false,
		drawer: true
	}),

	components: {
		Drawer
	},

	computed: {
		dynamicClass() {
			if (this.drawer) {
				return 'left'
			} else {
				return 'noLeft'
			}

		}
	}
};
</script>

<style lang="sass" scoped>
	.left
		margin-left: 200px

	.noLeft
		margin-left: 0px
</style>
