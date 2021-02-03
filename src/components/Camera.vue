<template>
	<div style="width: 100%; height: 100%; display: flex;">
		<v-card
			:loading="loading"
			width="80vh"
			max-height="87vh"
			elevation="4"
			style="margin-left: 0px !important;"
		>

		<v-toolbar flat >
			<v-toolbar-title v-if="$vuetify.breakpoint.xs" style="font-weight: bold">Selecione uma Imagem</v-toolbar-title>
			<v-row v-if="!$vuetify.breakpoint.xs" style="display: flex; margin-top: 15px">
				<!--<v-col
					class="d-flex"
					cols="12"
					sm="3"
				>
					<v-text-field
						v-model="requerente"
						label="Requerente"
					/>
				</v-col>
				<v-col
					class="d-flex"
					cols="12"
					sm="3"
				>
					<v-text-field
						v-model="responsavel"
						label="Responsável pela coleta"
					/>
				</v-col>-->
				<div style=" margin-left: 10px;">
					<v-btn
						small
						dark
						color="#44cc97"
						width="150px"
						style="margin-right: 10px"
						@click="img === null ? capture() : confirmar()"
					>
						<v-icon
							v-if="img === null"
							dark
							left
						>
							mdi-camera
						</v-icon>
						{{img === null ? 'Capturar' : 'Processar'}}
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
					<v-btn
						v-if="img !== null"
						style="margin-left: 10px"
						icon
						color="primary"
						@click="save"
					>
						<v-icon style="font-size: 24px !important" large>mdi-download</v-icon>

					</v-btn>
				</div>
			</v-row>
		</v-toolbar>
		<v-divider></v-divider>

		<v-container v-if="!$vuetify.breakpoint.xs" fluid>
			<div style="max-height: 80%">
				<video v-if="img === null" width="100%" autoplay="true" id="webCamera"></video>

				<v-avatar
					v-else
					tile="tile"
					size="100%"
					color="grey lighten-4"
				><img :src="img" />

				</v-avatar>
			</div>
		</v-container>
		<div style="display: flex; justify-content: space-between; margin-right: 100px; align-items: center">
			<template>
				<v-file-input
					v-model="file"
					accept="image/*"
					label="Selecione uma imagem..."
					style="padding-right: 10px"
				></v-file-input>
				<v-btn small depressed color="primary" @click="confirm" style="margin-left: 10px; margin-top: 2px !important">
					Confirmar
				</v-btn>
			</template>
		</div>

		<v-alert
		v-if="alert !== ''"
		dense
		text
		:type="success ? 'success' : 'error'"
		>
			{{alert}}
		</v-alert>
		<!--<div v-if="success" style="display: flex;  margin-left: 10px; align-items: center">
			<a style="text-decoration: none; color: #868686" @click="redirect()">
				Ir para Relatórios
			</a>
			<v-btn icon>
				<v-icon
					dark
					left
				>
					mdi-arrow-right
				</v-icon>
			</v-btn>
		</div>-->
		</v-card>

	</div>

</template>

<script>
import API from '../services'
import EventBus from '../EventBus'
import Moment from 'moment'

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
		loading: false,
		file: null,
		imageSrc: null,
		alert: '',
		success: false,
		requerente: '',
		responsavel: ''
		}
	},
	components: {

	},

	methods: {
		async capture() {
			var video = document.querySelector("#webCamera");

			//Criando um canvas que vai guardar a imagem temporariamente
			var canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			var ctx = canvas.getContext('2d');

			//Desenhando e convertendo as dimensões
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			//Criando o JPG
			var dataURI = canvas.toDataURL('image/png'); //O
			this.img = dataURI
			// console.log(dataURI)
			this.$store.state.img = this.img
		},

		save () {
			var a = document.createElement("a") //Create <a>
			a.href = this.img//Image Base64 Goes here
			a.download = `${Moment().format('MM-DD HH-mm-ss')}.png` //File name Here
			a.click()
		},

		async confirm () {
			var reader = new FileReader();
			reader.onload = (e) => {
				this.getData(e.target.result, this.file.name)
				// eslint-disable-next-line
				this.imageSrc = e.target.result
			};

			reader.onerror = function(error) {
				// eslint-disable-next-line
				console.log(error)
			};
			reader.readAsDataURL(this.file);
		},

		cancel () {
			this.img = null
			this.alert = ''
			this.loadCamera()
		},

		async loadCamera () {
				//Captura elemento de vídeo

			const interval = setInterval(function () {

				var video = document.querySelector("#webCamera");

				if (video) {
					//As opções abaixo são necessárias para o funcionamento correto no iOS

					video.setAttribute('autoplay', '');
					video.setAttribute('muted', '');
					video.setAttribute('playsinline', '');

						//--

					//Verifica se o navegador pode capturar mídia
					if (navigator.mediaDevices.getUserMedia) {
						navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user', width: 1920, height: 1080}})
						.then( function(stream) {
							//Definir o elemento vídeo a carregar o capturado pela webcam
							video.srcObject = stream;
						})
						.catch(function() {
							// eslint-disable-next-line
							console.log("Oooopps... Falhou :'(");
						});
					}

					clearInterval(interval)
				}
			}, 10);
		},

		confirmar () {
			this.getData(this.img, 'image')
		},

		getData (base64, fileName) {
			this.loading = true
			API.savePost(base64, fileName)
				.then(response => {
					this.$store.state.id++
					this.$store.state.img = base64
					this.$store.state.json.push({
						data: response.data,
						id: this.$store.state.id,
						text: `Amostra ${this.$store.state.id}`,
						img: base64,
						requerente: this.requerente,
						responsavel: this.responsavel
					})
					EventBus.$emit('atualizarNotificacoes',
						{message: `${this.truncateDecimals(response.data.classes.sadio, 2)}% da sua amostra são de grãos sadios! `}
					)
					this.alert = 'Imagem processada com sucesso!'
					this.success = true
					this.loading = false
					this.requerente = ''
					this.responsavel = ''
				})
				.catch(error => {
					this.alert = 'Houve um erro ao realizar a requisição. Por favor, tente novamente!'
					// eslint-disable-next-line
					console.log(error)
					this.success = false
					this.loading = false
				})
		},

		truncateDecimals (number, digits) {
			var multiplier = Math.pow(10, digits),
				adjustedNum = number * multiplier,
				truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

			return truncatedNum / multiplier;
		},

		redirect () {
			this.$router.push('/relatorios')
		}
	},

	mounted () {
		this.loadCamera()
	}
	}
</script>

<style lang="sass" scoped>
	.btn-ir-rel
		width: 100%
		display: flex
		justify-content: flex-end

	.v-btn__content
		font-size: 12px !important
</style>
