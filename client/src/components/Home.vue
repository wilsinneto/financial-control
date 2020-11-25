<template>
  <main id="main">
    <h1>Olá, Seja bem vindo ao seu sistema de controle financeiro!</h1>
    <section class="section">
      <a class="link" rel="capitals" v-on:click="toCapitals()">
        <div class="item">
          Receitas
        </div>
      </a>
      <a class="link" rel="spends" v-on:click="toSpends()">
        <div class="item">
          Despesas
        </div>
      </a>
    </section>
  </main>
</template>

<script>
export default {
  app: "Home",
  methods: {
    toCapitals() {
      this.$router.push("/capitals");
    },
    toSpends() {
      this.$router.push("/spends");
    }
  }
}
</script>

<style>
#main {
  text-align: center;
  margin-top: 60px;
}
.section {
  max-width: 800px;
  height: 300px;
  margin: 80px auto 0 auto;
  display: flex; 
  align-items: center;
  justify-content: space-around;
  background-color: currentColor;
}
.link {
  text-decoration: none;
  height: 200px;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  background-color: #ccc;
}
.item{
  color: #2c3e50;
  margin-top: 43%;
}
</style>