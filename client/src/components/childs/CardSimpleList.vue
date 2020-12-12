<template>
  <main id="list">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item disabled">
              <div class="row">
                <div class="col-md-1">Id</div>
                <div class="col-md-5">Descrição</div>
                <div class="col-md-2">Valor</div>
                <div class="col-md-2">Data</div>
              </div>
            </li>
            <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
              <div class="row">
                <div class="col-md-1">{{item.id}}</div>
                <div class="col-md-5">{{item.items.description}}</div>
                <div class="col-md-2">{{item.value}}</div>
                <div class="col-md-2">{{item.date ? item.date.split("T")[0] : ""}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "List",
  props: ["items"],
}
</script>
