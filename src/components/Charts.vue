<script>
// import { Pie } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import EventBus from '../EventBus'

export default {
	props: {
		report: { type: Boolean, default: false},
		amostra: { type: Object }
	},

	extends: Bar,
	mounted () {
		const label = []
		const data = []
		const self = this
		let amostra

		if (!this.amostra.data) {
			amostra = this.$store.state.json[0].data.classes
		} else {
			amostra = this.amostra.data.classes
		}

		Object.entries(amostra).forEach(([key, value]) => {
			label.push(key)
			data.push(self.truncateDecimals(value, 2))
		})
		// Overwriting base render method with actual data.
		this.renderChart({
			// labels: ['Sadios', 'Imaturos', 'Queimados', 'Sujeira', 'Chochos', 'Fermentados'],
			labels: label,
			datasets: [
			{
				label: 'porcentagem (%)',
				backgroundColor: '#44cc97',
				// data: [95, 2, 1, 0.5, 1, 0.5]
				data: data
			}
			]
		}, {responsive: true, animation: { onComplete: this.done()}})
	},

	methods: {
		done () {
			if (this.report) {

				const canvas = this.$refs.canvas
				setTimeout(function(){
					const img = canvas.toDataURL('img/png')

					EventBus.$emit('chartImage', img)
				}, 2000);
			}
		},

		truncateDecimals (number, digits) {
			var multiplier = Math.pow(10, digits),
				adjustedNum = number * multiplier,
				truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

			return truncatedNum / multiplier;
		},

		render (dados) {
			const label = []
			const data = []
			const self = this
			let amostra

			if (!dados) {
				amostra = this.$store.state.json[0].data.classes
			} else {
				amostra = dados.data.classes
			}

			Object.entries(amostra).forEach(([key, value]) => {
				label.push(key)
				data.push(self.truncateDecimals(value, 2))
			})

			this.renderChart({
			// labels: ['Sadios', 'Imaturos', 'Queimados', 'Sujeira', 'Chochos', 'Fermentados'],
			labels: label,
			datasets: [
			{
				label: 'porcentagem (%)',
				backgroundColor: '#44cc97',
				// data: [95, 2, 1, 0.5, 1, 0.5]
				data: data
			}
			]
		}, {responsive: true, animation: { onComplete: this.done()}})
		}
	}
}
</script>