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
				dark
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
		<div >
			<template>
				<v-file-input
					v-model="file"
					accept="image/*"
					label="Selecione uma imagem..."
					style="padding-right: 10px"
				></v-file-input>
				<v-btn small depressed color="primary" @click="confirm" style="margin-left: 10px">
					Confirmar
				</v-btn>
			</template>
		</div>
		</v-card>
	</div>

</template>

<script>
import API from '../services'
import EventBus from '../EventBus'

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
		imageSrc: null
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
			this.getData(this.img, 'image')

			// var a = document.createElement("a") //Create <a>
			// a.href = this.img//Image Base64 Goes here
			// a.download = "Image.png" //File name Here
			// a.click()
		},

		async confirm () {
			this.loading = true

			var reader = new FileReader();
			reader.onload = (e) => {
				this.getData(e.target.result, this.file.name)
				// eslint-disable-next-line
				this.imageSrc = e.target.result
			};

			reader.onerror = function(error) {
			alert(error);
			};
			reader.readAsDataURL(this.file);
		},

		cancel () {
			this.img = null
			this.loadCamera()
		},

		loadCamera () {
				//Captura elemento de vídeo
			var video = document.querySelector("#webCamera");
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
					alert("Oooopps... Falhou :'(");
				});
			}

		},

		getData (base64, fileName) {
			API.savePost(base64, fileName)
				.then(response => {
					this.$store.state.json = response.data
					EventBus.$emit('atualizarNotificacoes',
						{message: `Parabéns! ${this.truncateDecimals(this.$store.state.json.classes.sadio, 2)}% da sua amostra são de grãos sadios! `}
					)
					this.loading = false
				})
				.catch(error => {
					// eslint-disable-next-line
					console.log(error)
					this.loading = false
				})
		},

		truncateDecimals (number, digits) {
			var multiplier = Math.pow(10, digits),
				adjustedNum = number * multiplier,
				truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

			return truncatedNum / multiplier;
		}
	},

	mounted () {
		this.loadCamera()
		// eslint-disable-next-line
		console.log(this.$store.state.json)
	}
	}
</script>
