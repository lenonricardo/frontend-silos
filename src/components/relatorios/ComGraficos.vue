<template>
	<div>
		<Header/>
		<div class="text-content">
			<div class="text-content-left">
				<div class="line"><span class="title">Amostra Nº: </span><span>10</span></div>
				<div class="line"><span class="title">Requerente: </span><span> Lenon Ricardo Mendes</span></div>
				<div class="line"><span class="title">Responsável pela coleta: </span><span> Ricardo Mendes</span></div>
			</div>
			<div class="text-content-right">
				<div class="line"><span class="title">Peso: </span><span>100g</span></div>
				<div class="line"><span class="title">Umidade: </span><span>10%</span></div>
				<div class="line"><span class="title">Teor de Impureza: </span><span>15%</span></div>
			</div>
		</div>
		<div class="img-amostra">
			<h1 class="img-text"> Imagem da Amostra</h1>
			<img src="../../assets/amostra.png" class="image"/>
		</div>
		<div class="frame">
			<div class="header-frame">
				<span>Dados Extraídos da Amostra</span>
			</div>
			<img v-bind:src="chartImage" class="chart-image"/>
			<div class="chart-label">
				<div class="line"><span class="title">Total: </span><span style="margin-right: 10px">1.235 (100%)</span></div>
				<div class="line"><span class="title">Não detectados: </span><span>5 (0.2%)</span></div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './components/header'

export default {
	props: {
		chartImage: {required: true, type: String}
	},

	components: {
		Header
	}
}
</script>
<style lang="sass" scoped>
	.text-content
		display: flex
		margin-top: 30px
		flex-direction: row
		justify-content: center

	.text-content-left
		text-align: justify
		margin-right: 100px

	.text-content-right
		align-item: flex-start

	.line
		flex-direction: row
		margin-left: 10

	.title
		font-weight: bold

	.img-amostra
		width: 100%
		display: flex
		align-items: center
		justify-content: center
		margin-top: 30px
		flex-direction: column
		margin-bottom: 150px

	.img-text
		margin-bottom: 10px
		font-weight: bold
		text-decoration: underline

	.image
		width: 65%

	.frame
		border: 1px solid black
		margin: 20px

	.header-frame
		magin: 10px
		font-weight: bold

	.chart-label
		margin: 20
		text-align: justify
		display: flex
		flex-direction: row
		justify-content: center
		width: 100%

</style>
