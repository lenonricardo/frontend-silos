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
			labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
			datasets: [
			{
				label: 'GitHub Commits',
				backgroundColor: '#44cc97',
				data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
			}
			]
		}, {responsive: true, animation: { onComplete: this.done()}})
	},

	methods: {
		done () {
			if (this.report) {
				const self = this

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