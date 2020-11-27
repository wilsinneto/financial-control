<template>
  <main id="CardFormList">
    <div class="container">
      <div class="col">
        <errors v-bind:errors="errors"></errors>
      </div>
      <form>
        <div class="form-row">
          <div class="form-group col-md-5">
            <label>{{ title }}</label>
            <!-- <label><router-link to="title">{{ title }}</router-link></label> -->
            <select id="inputState" class="form-control" v-model="selected">
              <option disabled value="">Por favor, selecione um</option>
              <option v-for="item in recipes" :key="item.id">
                {{ item.description }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-1 btnAdd">
            &nbsp;
            <span
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#itemAdd"
            >
              <i class="fa fa-plus"></i>
            </span>
          </div>
          <div class="modal fade" id="itemAdd" tabindex="-1" role="dialog" aria-labelledby="itemAddLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="itemAddLabel">Adicionar {{ title }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-row">
                      <input type="text" class="form-control" v-model="item.description" name="" id="">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary" v-on:click.prevent="addItem(item)" data-dismiss="modal">Salvar</button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-2">
            <label for="value">Valor</label>
            <input type="text" class="form-control" id="value" v-model="item.value" placeholder="0.00">
          </div>
          <div class="form-group col-md-2">
            <label for="date">Data de recebimento</label>
            <input type="date" class="form-control" id="date" v-model="item.date">
          </div>
          <div class="form-group col-md-2 btnAdd">
            <button type="submit" class="btn btn-primary" v-on:click.prevent="saveItem(item)">Salvar</button>
          </div>
        </div>
      </form>
      <br/>
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
            <li class="list-group-item" v-for="item in capitals" v-bind:key="item.id">
              <div class="row">
                <div class="col-md-1">{{item.id}}</div>
                <div class="col-md-5">{{item.recipes.description}}</div>
                <div class="col-md-2">{{item.value}}</div>
                <div class="col-md-2">{{item.date ? item.date.split("T")[0] : ""}}</div>
                <div class="col-md-2 text-right">
                  <span
                    v-on:click="updateItem(item)"
                    class="btn btn-success"
                  >
                    <i class="fa fa-pencil"></i>
                  </span>
                  &nbsp;
                  <span
                    v-on:click="removeItem(item)"
                    class="btn btn-danger"
                  >
                    <i class="fa fa-trash"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Errors from './Errors.vue';
import { validateInputFormRecipes } from "../../utils/validate/RecipeValidate";
import { validateInputFormCapitals } from "../../utils/validate/RecipeWithCapitals";

export default {
  name: "Recipes",
  components: {
    Errors
  },
  props: ["title","recipes","capitals"],
  data() {
    return {
      errors: [],
      selected: "",
      item: {
        description: "",
        value: "",
        date: Date
      },
    }
  },
  methods: {
    async saveItem(payload) {
      console.log("saveItem", payload);
      payload.description = this.selected;
      const { recipe, errors } = validateInputFormCapitals(payload);
      this.errors = errors;
      if (!errors.length) {
        if (payload.id) {
          console.log("update");
          this.$emit("saveItem", recipe);
          this.clearInputs();
        } else {
          console.log("create");
          this.$emit("saveItem", recipe);
          this.clearInputs();
        }
      }
    },
    async removeItem(payload) {
      console.log("remove");
      this.$emit("removeItem", payload);
      this.clearInputs();
    },
    updateItem(payload) {
      console.log("updateItems");
      this.selected = payload.recipes.description;
      this.item = payload;
    },
    async addItem(payload) {
      console.log("addItem");
      const { recipe, error } = validateInputFormRecipes(payload);
      payload.description = recipe;
      this.errors.push(error);
      if (!error.length) {
        this.$emit("addItem", payload);
        this.errors = [];
        this.item.description;
      }      
    },
    clearInputs() {
      this.errors = [];
      this.selected = "";
      this.item = {};
      this.item.date = Date;
    },
  }
}
</script>

<style>
#CardFormList {
  margin: 60px;
}
.btnAdd {
  margin-top: 32px;
}
.routerLink{
  margin-right: 8px;
}
</style>