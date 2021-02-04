<template>
	<div style="width: 100%; height: 100%; display: flex;">
		<v-card
			width="70vh"
			max-height="87vh"
			elevation="4"
			style="margin-left: 0px !important;"
		>
			<v-system-bar></v-system-bar>
			<v-toolbar flat>
				<v-toolbar-title style="font-weight: bold">Gráficos</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>
			<v-banner
				single-line
			>
				{{text}}
			</v-banner>
			<v-container fluid>
				<div style="max-height: 80%">
					<Chart v-if="this.$store.state.json.length > 0" :amostra="this.$store.state.json[index]"/>
				</div>
			</v-container>
		</v-card>
	</div>
</template>

<script>
	import Chart from './Charts'

	export default {
	data: () => ({
		form: {
		name: '',
		position: '',
		},
		isLogin: false,
		alert: false,
	}),

	components: {
		Chart
	},
	computed: {
		text () {
			return this.$store.state.json.length ? 'Resultados da última amostra coletada.' : '<Não há dados disponíveis>'
		},

		index () {
			return this.$store.state.json.length - 1
		}
	},

	methods: {
		storeIt() {
		this.$store.commit('change', this.form);
		this.isLogin = this.$store.getters.isLogin;
		this.alert = false;
		if (this.isLogin) {
			this.$router.push('/view');
		} else {
			this.alert = true;
		}
		},
	},
	};
</script>
