<template>
  <main>
    <div class="main-container">
      <div class="instructions">
        <h1 class="title">Imprime el acta<br /></h1>
        <div>
          <button class="maduro-coño-e-tu-madre">Leer [QR]</button>
        </div>
        <div></div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
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
  padding: 0px 16px;
}
.main-container {
  height: 100%;
  padding-top: 74px;
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
  margin: 10px 0px 36px 0px;
}
video {
  border-radius: 8px;
  box-shadow: 0 0 6px -1px black;
}
.candidato,
.dictador,
.alacranes {
  border-radius: 8px;
  max-width: 64px;
  margin: 4px 12px 8px 0px;
}
.candidato {
  margin: 12px 12px 8px 0px;
}
</style>
