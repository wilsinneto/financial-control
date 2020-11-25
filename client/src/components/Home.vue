<template>
  <main id="main">
    <h1>Olá, Seja bem vindo ao seu sistema de controle financeiro!</h1>
    <section class="section">
      <a class="link" rel="capitals">
        <router-link to="/capitals">
          <div class="item">
            Receitas
          </div>
        </router-link>
      </a>
      <a class="link" rel="spends">
        <router-link to="/spends">
          <div class="item">
            Despesas
          </div>
        </router-link>
      </a>
    </section>
  </main>
</template>

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
  background-color: #ccc;
}
.item{
  color: #2c3e50;
  margin-top: 43%;
}
</style>