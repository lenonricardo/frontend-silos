<template>
	<v-app>
		<v-app-bar color="#44cc97" app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer">
			</v-app-bar-nav-icon>
			<v-toolbar-title class="headline text-uppercase" style="display: flex; align-items: center">
				<v-img style="width: 110px; margin-right: 3px" src="./assets/logo-sem-fundo.png"></v-img>
				<span style="font-size: 10px !important">BETA</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<NotificationDrawer :drawer="rightDrawer" :messages.sync="messages"/>

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
import NotificationDrawer from './components/NotificationDrawer.vue'

export default {
	name: 'App',
	data: () => ({
		dialog: false,
		drawer: true,
		rightDrawer: null,
		messages: 0
	}),

	components: {
		Drawer,
		NotificationDrawer
	},

	created () {
		window.addEventListener("resize", this.myEventHandler);
	},

	methods: {
		myEventHandler () {
			if (this.$vuetify.breakpoint.md) {
				// this.drawer = false
			}
		}
	},

	computed: {
		dynamicClass() {
			if (this.$vuetify.breakpoint.xs) {
				return 'noLeft'
			} else {
				return 'left'
			}
			// else if (this.drawer) {
			// 	return 'left'
			// } else {
			// 	return 'noLeft'
			// }
		}
	}
}
</script>

<style lang="sass">
	.left
		margin-left: 256px
		margin-right: 100px

	.noLeft
		margin-left: 0px

	.v-badge__badge
		font-size: 12px !important
</style>
