<template>
	<v-app>
		<v-app-bar color="#44cc97" app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer">
			</v-app-bar-nav-icon>
			<v-toolbar-title class="headline text-uppercase">
				<v-img style="width: 110px" src="./assets/logo-sem-fundo.png"></v-img>
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

	computed: {
		dynamicClass() {
			if (this.drawer && this.$vuetify.breakpoint.xsAndUp) {
				return 'noLeft'
			} else if (this.drawer) {
				return 'left'
			} else {
				return 'noLeft'
			}
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
