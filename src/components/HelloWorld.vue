<template>
	<div style="width: 100%; height: 100%; display: flex;">
		<Chart/>
	</div>
</template>

<script>
import Chart from './Charts'

export default {
  data: () => ({
    form: {
      name: '',
      position: '',
    },
    isLogin: false,
    alert: false,
  }),

  components: {
     Chart
  },

  methods: {
    storeIt() {
      this.$store.commit('change', this.form);
      this.isLogin = this.$store.getters.isLogin;
      this.alert = false;
      if (this.isLogin) {
        this.$router.push('/view');
      } else {
        this.alert = true;
      }
    },
  },
};
</script>
