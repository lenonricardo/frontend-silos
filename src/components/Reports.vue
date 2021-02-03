<template>
<div style="width: 100%; height: 100%; display: flex;">
	<v-card
		:loading="loading"
		:disabled="loading"
		width="70vh"
		max-height="80vh"
		elevation="4"
		style="margin-left: 0px !important;"
	>
	<v-system-bar></v-system-bar>
	<v-toolbar flat>
		<v-toolbar-title style="font-weight: bold">Relatórios</v-toolbar-title>
	</v-toolbar>
	<v-banner
		single-line
	>
		Selecione o modelo do relatório desejado.
	</v-banner>
	<v-container fluid>
		<v-row align="center">
			<v-col
			class="d-flex"
			cols="12"
			sm="6"
			>
			<v-select
				v-model="amostraSelected"
				:items="amostras"
				item-text="text"
				item-value="id"
				label="Amostra"
			></v-select>
			<v-spacer/>
			</v-col>
		</v-row>
		<v-row align="center">
			<v-col
			class="d-flex"
			cols="12"
			sm="6"
			>
			<v-select
				v-model="select"
				:items="items"
				item-text="texto"
				item-value="valor"
				label="Modelo"
			></v-select>
			<v-spacer/>
			</v-col>
			<v-col
				class="d-flex"
				cols="12"
				sm="6"
			>
				<v-btn
					small
					dark
					color="#44cc97"
					width="120px"
					@click="gerar"
				>
					Gerar
				</v-btn>
			</v-col>
		</v-row>
		<v-alert
			v-if="alertar"
			dense
			text
			type="error"
		>
			Não há dados disponíveis para Gerar Relatórios.
		</v-alert>
	</v-container>
	<Report
		:model="select"
		:amostra="dataAmostra"
	/>
	</v-card>
</div>
</template>
<script src="https://smtpjs.com/v3/smtp.js"></script>
<script>
import Report from './Report'
import EventBus from '../EventBus'
import Email from '../smtp.js';

export default {
components: {
	Report
},

data: () => ({
	items: [
		{ texto: 'Cooperado', valor: 'sem-grafico'},
		{ texto: 'Com Gráfico/Imagem', valor: 'grafico'}
	],
	select: 'sem-grafico',
	gerarRelatorio: false,
	loading: true,
	alertar: false,
	amostraSelected: 1,
	dataAmostra: {}
}),

computed: {
	amostras () {
		return this.$store.state.json
	}
},

watch: {
	amostraSelected (value) {
		this.dataAmostra = this.$store.state.json.find(p => p.id === value)
	}
},

methods: {
	gerar() {
		if (this.$store.state.json.length) {
			EventBus.$emit('gerarRelatorio', this.select.valor)
		} else {
			this.alertar = true
		}
		// this.sendEmail()
	},
	// change() {
	// 	this.dataAmostra = this.$store.state.json.find(p => p.id === this.amostraSelected)
	// },

	sendEmail () {

		Email.send({
			SecureToken: "e5c99654-0966-44da-8fdc-8ca6041a9a2d",
			To: 'lenon_ricardo@hotmail.com',
			From: "lenonricardomendes@gmail.com",
			Subject: "Existem grãos que são sadios",
			Body: "<a href='google.com'>Top</a> demais!",
		})
			.then(function (message) {
				// eslint-disable-next-line
				console.log(message)
			});
	}
},
created () {
	const self = this

	setTimeout(function(){
		self.loading = false
	}, 2000);
},

mounted () {
	this.amostraSelected = 1
	this.dataAmostra = this.$store.state.json[0]
},

destroyed () {
	EventBus.$off('gerarRelatorio');
}

};
</script>
