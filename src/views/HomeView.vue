<template>
  <main>
    <div class="main-container">
      <div class="instructions">
        <h1 class="title">Imprime el acta<br /></h1>
        <div>
          <label class="maduro-coño-e-tu-madre" for="acta">Cargar acta para impresión</label>
          <input v-show="false" id="acta" type="file" class="maduro-coño-e-tu-madre" @change="handleFileUpload"
            accept="image/*" />
        </div>
        <canvas v-show="false" ref="canvas" id="canvas"></canvas>
        <canvas v-show="false" class="acta-to-print" width="1" height="1" ref="canvaresult" id="canvaresult" />
        <div>
          <button v-show="actaUploaded" class="maduro-coño-e-tu-madre imprimir" @click="handlePrint">Imprimir
            Acta</button>
          <img ref="imageActaResult" src="" />
        </div>
        <br />
        ¿Quieres ver leer el contenido del código QR?
        <a href="https://lectorqreleccionesvzla2024.com">lectorqreleccionesvzla2024.com</a>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const canvaresult = ref<HTMLCanvasElement | null>(null);
const imageActaResult = ref<HTMLImageElement | null>(null);
const actaUploaded = ref(false);

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.value?.getContext('2d');
      if (!canvas.value || !ctx) {
        return;
      }

      canvas.value.width = img.width;
      canvas.value.height = img.height;
      ctx.drawImage(img, 0, 0);

      const segmentWidth = img.width;
      const segmentHeight = img.height / 4;

      const segmentHalfWidth = Math.round(segmentWidth / 2);
      const segmentHalfHeight = Math.round(segmentHeight / 2);

      const stripCanvas = canvaresult.value;
      const stripCtx = stripCanvas?.getContext('2d');
      if (stripCanvas && stripCtx) {
        stripCtx.canvas.width = segmentHalfWidth * 4;
        stripCtx.canvas.height = segmentHalfHeight;
        //       drawImage(img, sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight)
        stripCtx.drawImage(img, 0, 0, segmentWidth, segmentHeight, 0, 0, segmentHalfWidth, segmentHalfHeight);
        stripCtx.drawImage(img, 0, segmentHeight, segmentWidth, segmentHeight, segmentHalfWidth, 0, segmentHalfWidth, segmentHalfHeight);
        stripCtx.drawImage(
          img,
          0,
          segmentHeight * 2,
          segmentWidth,
          segmentHeight,
          segmentHalfWidth * 2,
          0,
          segmentHalfWidth,
          segmentHalfHeight,
        );
        stripCtx.drawImage(
          img,
          0,
          segmentHeight * 3,
          segmentWidth,
          segmentHeight,
          segmentHalfWidth * 3,
          0,
          segmentHalfWidth,
          segmentHalfHeight,
        );

        const actaDataURL = stripCanvas.toDataURL();
        if (imageActaResult.value) imageActaResult.value.src = actaDataURL;

        actaUploaded.value = true;
        const link = document.createElement('a');
        link.href = actaDataURL;
        link.download = 'acta.png';
        link.click();
        link.remove();
      }
    };

    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}

function handlePrint() {
  if (!imageActaResult.value) return

  const printWindow = window.open(imageActaResult.value.src, '_blank');
  if (!printWindow) return

  printWindow.document.write(`
      <html>
        <head>
          <title>Acta de votación</title>
          <style>
            @page {
              size: landscape;
            }
            body {
              margin: 0;
              padding: 0;
            }
            img {
              width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${imageActaResult.value.src}" />
        </body>
      </html>
    `);
  printWindow.document.close();
  printWindow.print();
}

</script>

<style scoped lang="scss">
.title {
  color: #fffbfb;
  display: block;
  font-size: 34pt;
  font-weight: bolder;
  line-height: 0.9;
  width: fit-content;
  padding: 8px 0px;
  margin: 16px 0;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background-color: transparent;
  }
}

.white-text {
  color: rgb(255, 255, 255);
  text-shadow: 0 0 1px #000000c4;
  font-weight: bold;
  padding: 4px 0;
  margin: 0 12px 15px 12px;
}

.instructions {
  width: auto;
  margin: auto;
  padding: 0px 20px;

  @media screen and (min-width: 768px) {
    padding: 0 30px;
  }
}

.main-container {
  height: 100%;
  padding-top: 74px;
  padding-bottom: 30px;
  width: 100%;
  max-width: 80rem;

  @media screen and (min-width: 768px) {
    padding-top: 120px;
  }
}

.tap-container.row {
  justify-content: flex-start;
  margin: 0 12px;
}

.scann-qrcode {
  max-width: 250px;
  max-height: 250px;
}

.qrcode {
  word-break: break-all;
}

.maduro-coño-e-tu-madre {
  background: #00804d;
  border-radius: 4px;
  border: transparent;
  padding: 8px 16px;
  color: white;
  box-shadow: 0 0 6px -1px black;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;

  &.imprimir {
    margin: 10px 0px 36px 0px;
  }
}

.acta-to-print {
  width: 100%;
}
</style>
