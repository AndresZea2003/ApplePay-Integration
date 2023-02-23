<!--<script setup>-->
<!--// const paymentRequestObject = {-->
<!--//     countryCode: 'US',-->
<!--//     currencyCode: 'USD',-->
<!--//     merchantCapabilities: ['supports3DS'],-->
<!--//     supportedNetworks: ['visa', 'masterCard', 'amex'],-->
<!--//     total: {-->
<!--//         label: 'Total',-->
<!--//         amount: '10.00'-->
<!--//     }-->
<!--// };-->
<!--//-->
<!--// const requestPayment = async () => {-->
<!--//     if (window.ApplePaySession) {-->
<!--//         const paymentRequest = new window.ApplePaySession(1, paymentRequestObject);-->
<!--//         paymentRequest.begin();-->
<!--//     } else {-->
<!--//         console.log('La biblioteca de Apple Pay no se ha cargado correctamente.');-->
<!--//     }-->
<!--// };-->
<!--</script>-->
<!--<template>-->
<!--    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">-->
<!--        <div class="w-full max-w-md rounded-lg shadow-lg p-8 bg-white">-->
<!--            <h2 class="text-2xl font-bold mb-4">Pagar con Apple Pay</h2>-->
<!--            <div class="flex items-center justify-between mb-4">-->
<!--                <p class="text-lg font-semibold">Total:</p>-->
<!--                <p class="text-lg font-semibold">$999.00</p>-->
<!--            </div>-->
<!--            <div class="rounded-lg border border-gray-300 p-4 mb-4">-->
<!--                <img src="https://developer.apple.com/news/images/og/apple-pay-og-twitter.jpg" alt="">-->
<!--                <p class="text-lg font-semibold mb-2">Producto</p>-->
<!--                <p class="text-sm text-gray-500">Test integracion de Apple Pay</p>-->
<!--            </div>-->
<!--            <div class="flex flex-col space-y-4">-->
<!--                <button-->
<!--                        class="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200">Pagar-->
<!--                    con Apple Pay-->
<!--                </button>-->
<!--                <button-->
<!--                    class="bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200">-->
<!--                    Pagar con otra forma de pago-->
<!--                </button>-->
<!--                <div class="flex justify-center">-->
<!--                    <apple-pay-button buttonstyle="black" type="plain" locale="en"></apple-pay-button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->
<template>
  <div class="pixel-board" @mousedown="startPainting" @mouseup="stopPainting" @mouseleave="stopPainting">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="pixel-row">
      <div v-for="(pixel, pixelIndex) in row" :key="pixelIndex"
           class="pixel"
           :style="{backgroundColor: pixel.color}"
           @mousemove="paintPixel(rowIndex, pixelIndex)"
           @mousedown="paintPixel(rowIndex, pixelIndex)">
      </div>
    </div>
    <button @click="clearBoard">Clear</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      currentColor: '#000000',
      isPainting: false,
      currentPixel: { x: null, y: null },
    };
  },
  mounted() {
    this.initBoard();
  },
  methods: {
    initBoard() {
      for (let i = 0; i < 20; i++) {
        let row = [];
        for (let j = 0; j < 20; j++) {
          row.push({ color: '#ffffff' });
        }
        this.board.push(row);
      }
    },
    startPainting(event) {
      this.isPainting = true;
      const pixel = this.getPixelFromEvent(event);
      this.currentPixel = pixel;
      this.updatePixelColor(pixel.x, pixel.y);
    },
    stopPainting() {
      this.isPainting = false;
      this.currentPixel = { x: null, y: null };
    },
    paintPixel(rowIndex, pixelIndex) {
      if (this.isPainting) {
        const pixel = { x: rowIndex, y: pixelIndex };
        if (pixel.x !== this.currentPixel.x || pixel.y !== this.currentPixel.y) {
          this.currentPixel = pixel;
          this.updatePixelColor(pixel.x, pixel.y);
        }
      }
    },
    updatePixelColor(rowIndex, pixelIndex) {
      this.board[rowIndex][pixelIndex].color = this.currentColor;
    },
    clearBoard() {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[i].length; j++) {
          this.board[i][j].color = '#ffffff';
        }
      }
    },
    getPixelFromEvent(event) {
      const rect = event.target.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / 20);
      const y = Math.floor((event.clientY - rect.top) / 20);
      return { x, y };
    },
  },
};
</script>

<style scoped>
.pixel-board {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pixel-row {
  display: flex;
}

.pixel {
  width: 20px;
  height: 20px;
  border: 1px solid #000000;
}

button {
  margin-top: 20px;
}

.color-picker {
  display: flex;
  justify-content: center;
  align-items: center;
}

.color {
  width: 30px;
  height: 30px;
  border: 2px solid #000000;
  margin-right: 10px;
  cursor: pointer;
}

.color:hover {
  border-width: 3px;
}

.color.active {
  border-width: 3px;
}

.color-input {
  margin-right: 10px;
}

</style>
