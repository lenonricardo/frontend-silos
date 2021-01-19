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
		<v-simple-table>
			<template v-slot:default>
				<thead style="background-color: #f0f0f0">
				<tr>
					<th class="text-left">
						Classificação
					</th>
					<th class="text-left">
						Porcentagem (%)
					</th>
				</tr>
				</thead>
				<tbody>
				<tr
					v-for="item in classificacao"
					:key="item.grao"
				>
					<td style="text-align: center">{{ item.grao }}</td>
					<td style="text-align: center">{{ item.porcentagem }}</td>
				</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
import Header from './components/header'

export default {
	components: {
		Header
	},

	data: () => ({
		classificacao: [
			{ grao: 'Sadios', porcentagem: 95 },
			{ grao: 'Imaturos', porcentagem: 2 },
			{ grao: 'Queimados', porcentagem: 1 },
			{ grao: 'Fermentados', porcentagem: 1 },
			{ grao: 'Chochos', porcentagem: 0.5 }
		]
	})
}
</script>
<style lang="sass" scoped>
	.text-content
		display: flex
		margin-top: 30px
		flex-direction: row
		justify-content: center
		margin-bottom: 50px

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
