<template>
	<div id="root">
		<div class="header-report">
			<div class="header-items">
				<div style="margin-top: 10px">
					<img src="../../../assets/logo-cocamar.png" class="header-logo-img"/>
				</div>
				<div style="display: flex; flex-direction: column">
					<div class="header-text">
						<p style="fontWeight: bold">Cocamar Cooperativa Agroindustrial</p>
						<p class="header-info">Rodovia PR 218 - Km 16, LTS 163-E e 291-B, Centro, Atalaia - PR, 87630-000</p>
						<!--<p class="header-info">CNPJ: 76.107.770/0024-96</p>-->
					</div>
				</div>
			</div>
		</div>
		<div class="title-header">
			<p style="text-decoration: underline">{{title}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: { type: String, default: ''}
		},
	}
</script>

<style lang="sass" scoped>
	.header-report
		padding-left: 0px !important
		height: 105px
		border-bottom: 1px solid black
		padding-bottom: 20
		margin-top: 10px
		display: flex
		width: 100%

	.header-items
		display: flex
		flex-direction: row
		margin-top: 10px
		align-items: center

	.header-logo-img
		height: 40%
		top: 50%

	.header-text
		margin-left: 10px

	.header-info
		font-size: 11

	.title-header
		margin-top: 20px
		margin-bottom: 10px
		font-size: 20px
		display: flex
		align-items: center
		font-weight: bold
		width: 100%
		justify-content: center
</style>