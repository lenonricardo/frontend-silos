<template>
	<div style="width: 100%; height: 100%; display: flex;">
		<v-card
			:loading="loading"
			width="100vh"
			max-height="87vh"
			elevation="4"
			style="margin-left: 0px !important;"
		>

		<v-toolbar flat>
		<v-col
			class="d-flex"
			cols="12"
			sm="6"
		>
			<v-btn
				small
				color="#44cc97"
				width="150px"
				style="margin-right: 10px"
				@click="capture"
			>
				<v-icon
					dark
					left
				>
					mdi-camera
				</v-icon>
				Capturar
			</v-btn>
			<v-btn
				small
				color="error"
				width="150px"
				@click="cancel"
			>
			<v-icon
				dark
				left
			>
				mdi-cancel
			</v-icon>
				Cancelar
			</v-btn>
		</v-col>
		</v-toolbar>
		<v-divider></v-divider>

		<v-container fluid>
			<div style="max-height: 80%">
				<WebCam
					v-if="img === null"
					ref="webcam"
					:deviceId="deviceId"
					width="auto"
					height="100%"
					:isFrontCam="frontCam"
				>
			</WebCam>
			</div>
			<v-avatar
				v-if="img !== null"
				tile="tile"
				size="100%"
				color="grey lighten-4"
			><img :src="img" />
		</v-avatar>
		</v-container>
		</v-card>
	</div>
</template>

<script>
	import { WebCam } from 'vue-cam-vision'

	export default {
	data () {
		return {
		captures: [],
		imgReport: [],
		frontCam: false,
		webcam: null,
		img: null,
		camera: null,
		deviceId: null,
		devices: [],
		loading: false
		}
	},
	components: {
		WebCam
	},

	methods: {
		async capture() {
			this.loading = true
			this.img = await this.$refs.webcam.capture()
			this.loading = false
		},

		cancel () {
			this.img = null
		}
	}
	}
</script>
