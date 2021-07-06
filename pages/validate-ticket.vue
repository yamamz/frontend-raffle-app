<template>
  <div class="flex flex items-center justify-center p-4">
    <div class="flex flex-col items-center">
      <p class="text-lg font-bold text-indigo-600 mb-4">Validate Tickets</p>
      <div class="w-full bg-blue-100 flex items-center justify-center">
        <qrcode-stream
          :key="_uid"
          @decode="onDecode"
          @init="logErrors"
          class="rounded-lg"
          :camera="camera"
        >
          <div v-show="showScanConfirmation" class="scan-confirmation">
            <img src="/checkmark.svg" alt="Checkmark" width="128px" />
          </div>
        </qrcode-stream>
      </div>
      <button
        :disabled="ticketsCapture.length == 0"
        class="rounded bg-indigo-500 text-white text-base px-8 py-2 m-2"
        @click="markSoldTickets"
      >
        Mark as sold tickets
      </button>
      <p class="text-md font-bold text-indigo-600 mt-4">Detected tickets</p>
      <ol class="list-decimal">
        <li
          v-for="(item, index) in ticketCaptureDisplay"
          :key="index"
          class="border list-none rounded-sm px-3 py-3"
          style="border-bottom-width: 0"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  middleware: "auth-moderator",
  components: {
    QrcodeStream,
  },
  data() {
    return {
      camera: "auto",
      ticketsCapture: [],
      ticketCaptureDisplay: [],
      showScanConfirmation: false,
    };
  },
  methods: {
    async markSoldTickets() {
      try {
        let response = await this.$axios.post(
          "/api/ticket/validate-tickets",
          this.ticketsCapture
        );
      } catch (err) {}
    },
    logErrors(promise) {
      promise.catch(console.error);
    },
    async onDecode(result) {
      this.ticketsCapture.push(result.split(" ")[0]);
      this.ticketCaptureDisplay.push(result.split(" ")[1]);
      this.ticketsCapture = [...new Set(this.ticketsCapture)];
      this.ticketCaptureDisplay = [...new Set(this.ticketCaptureDisplay)];
      this.pause();
      await this.timeout(500);
      this.unpause();
    },
    unpause() {
      this.camera = "auto";
    },

    pause() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      });
    },
  },
};
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>