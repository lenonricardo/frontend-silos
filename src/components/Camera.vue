<template>
	<div style="width: 100%; height: 100%; display: flex;">
		<WebCam
        ref="webcam"
        :deviceId="deviceId"
        width="auto"
        height="100%"
        :isFrontCam="frontCam"
        >
    </WebCam>
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
    }
  },
  components: {
    WebCam
  }
}
</script>
