<template>
	<div>
		<Charts ref="chart" v-if="amostra" :report="true" :amostra="amostra" class="bar-chart"/>
		<vue-html2pdf
			:show-layout="false"
			:float-layout="true"
			:enable-download="false"
			:preview-modal="true"
			:paginate-elements-by-height="3000"
			filename="hee hee"
			:pdf-quality="2"
			:manual-pagination="false"
			pdf-format="a4"
			pdf-orientation="portrait"
			pdf-content-width="800px"
			ref="html2Pdf"
		>
		<section slot="pdf-content">
			<ComGraficos v-if="model === 'grafico'" :chartImage="chartImage" :classificacao="data"/>
			<SemGraficos v-else-if="model === 'sem-grafico'" :classificacao="data"/>
		</section>
		</vue-html2pdf>
	</div>
</template>

	<script>
	import EventBus from '../EventBus'
	import Charts from './Charts'
	import VueHtml2pdf from 'vue-html2pdf'
	import ComGraficos from './relatorios/ComGraficos'
	import SemGraficos from './relatorios/SemGraficos'

	export default {
	props: {
		model: { type: String, default: ''},
		amostra: { type: Object }
	},

	data: () => ({
		chartImage: ''
	}),

	watch: {
		// eslint-disable-next-line
		async amostra (newValue, oldValue) {
			if (this.$refs.chart) {
				this.$refs.chart.render(newValue)
			}
		}
	},

	computed: {
		isImgLoaded () {
			return this.chartImage !== ''
		},

		data () {
			let obj = {}
			const array = []

			Object.entries(this.amostra.data.classes).forEach(([key, value]) => {
				obj.grao = key
				obj.porcentagem = this.truncateDecimals(value, 2)

				array.push(obj)
				obj = {}
			})
			// eslint-disable-next-line

			let finalData = {
				data: array,
				id: this.amostra.id,
				img: this.amostra.img,
				requerente: this.amostra.requerente,
				responsavel: this.amostra.responsavel
			}

			return finalData
		}
	},

	methods: {
		generateReport () {
			this.$refs.html2Pdf.generatePdf()
		},

		truncateDecimals (number, digits) {
			var multiplier = Math.pow(10, digits),
				adjustedNum = number * multiplier,
				truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

			return truncatedNum / multiplier;
		}
	},

	components: {
		VueHtml2pdf,
		ComGraficos,
		SemGraficos,
		Charts
	},

	async mounted () {
		// document.getElementById('bar-chart').style.visibility = "hidden"
		const self = this
		await EventBus.$on('chartImage', function (img) {
			self.chartImage = img

			EventBus.$on('gerarRelatorio', function () {
				self.generateReport()
			})
		})
	},

	destroyed () {
		EventBus.$off('gerarRelatorio');
		EventBus.$off('chartImage');
	}

}
</script>
<style>
	.bar-chart {
		visibility: hidden !important
	}
</style>