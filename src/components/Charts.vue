<script>
import { Bar } from 'vue-chartjs'
import EventBus from '../EventBus'

export default {
	props: {
		report: { type: Boolean, default: false}
	},

	extends: Bar,
	mounted () {
		// Overwriting base render method with actual data.
		this.renderChart({
			labels: ['Sadios', 'Imaturos', 'Queimados', 'Sujeira', 'Chochos', 'Fermentados'],
			datasets: [
			{
				label: 'porcentagem (%)',
				backgroundColor: '#44cc97',
				data: [95, 2, 1, 0.5, 1, 0.5]
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
		}
	}
}
</script>