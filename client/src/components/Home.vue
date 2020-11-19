<template>
  <main id="main">
    <h1>Olá, Seja bem vindo ao seu sistema de controle financeiro!</h1>
    <section>
      <a class="link" href="" target="_blank" rel="expenses">
        <div class="item">Receitas</div>
      </a>
      <a class="link" href="" target="_blank" rel="despesas">
        <div class="item">Despesas</div>
      </a>
    </section>
  </main>
</template>

<style>
#main {
  text-align: center;
  margin-top: 60px;
}
section {
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
  padding: 0 10px;
  text-transform: uppercase;
  background-color: #ccc;
}
.item{
  color: #2c3e50;
  margin-top: 43%;
}
</style>