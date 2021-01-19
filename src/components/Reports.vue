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
				v-model="select"
				:items="items"
				item-text="texto"
				item-value="valor"
				label="Selecione"
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
					color="#44cc97"
					width="150px"
					@click="gerar"
				>
					Gerar
				</v-btn>
			</v-col>
		</v-row>
		<v-alert
			v-if="alertar"
			dense
			outlined
			type="error"
		>
			Ops! Parece que esse modelo ainda não foi implementado.
		</v-alert>
	</v-container>
	<Report
		:model="select"
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
		{ texto: 'Gráfico', valor: 'grafico'},
		{ texto: 'Cooperado', valor: 'sem-grafico'}
	],
	select: 'grafico',
	gerarRelatorio: false,
	loading: true,
	alertar: false
}),

methods: {
	gerar() {
		EventBus.$emit('gerarRelatorio', this.select.valor)
		// this.sendEmail()
	},

	sendEmail () {

		Email.send({
			SecureToken: "e5c99654-0966-44da-8fdc-8ca6041a9a2d",
        To: 'lenon_ricardo@hotmail.com',
        From: "lenonricardomendes@gmail.com",
        Subject: "Existem grãos que são sadios",
        Body: "<a href='google.com'>Top</a> demais!",
      })
        .then(function (message) {
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

destroyed () {
	EventBus.$off('gerarRelatorio');
}

};
</script>
