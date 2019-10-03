<template>
  <header>
    <h1><img src="@/assets/logo.svg" alt="Here goes the logo" /></h1>
    <h2>Predict today the best crypto of tomorrow and win numerous ETH prizes</h2>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
}
h1 {
  background-color: #333;
  color: white;
  height: 140px;
  margin-left: 20px;
  position: relative;
  width: 140px;
  img {
    position: absolute;
    top: 35px;
    left: 15px;
    width: 80%;
  }
}
h2 {
  color: #666;
  left: 200px;
  max-width: calc(100vw - 240px);
  position: absolute;
  top: 35px;
  width: 500px;
}
@media screen and (max-width: 959px) {
  h2 {
    font-size: 1.2rem;
  }
}
</style>
