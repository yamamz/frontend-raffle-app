<template>
  <div class="flex flex items-center justify-center p-4">
    <div class="flex flex-col items-center">
      <h1>Validate Tickets</h1>
      <div class="w-full bg-blue-100 flex items-center justify-center">
        <qrcode-stream
          :key="_uid"
          :track="paintBoundingBox"
          @decode="onDecode"
          @init="logErrors"
        />
      </div>
      <p>Detected tickets</p>
      <ul>
        <li v-for="(item, index) in ticketsCapture" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      ticketsCapture: [],
    };
  },
  methods: {
    logErrors(promise) {
      promise.catch(console.error);
    },
    onDecode(result) {
      this.ticketsCapture.push(result);
      this.ticketsCapture = [...new Set(this.ticketsCapture)];
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },
  },
};
</script>

<style>
</style>