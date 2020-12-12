<template>
  <div>
    <form>
      <div class="col">
          <errors v-bind:errors="errors"></errors>
      </div>
      <div class="container">
        <div class="form-row">
          <div class="form-group col-md-5">
            <label>{{ title }}</label>
            <!-- <label><router-link to="title">{{ title }}</router-link></label> -->
            <select id="inputState" class="form-control" v-model="selected">
              <option disabled value="">Por favor, selecione um</option>
              <option v-for="item in items" :key="item.id">
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
                      <input type="text" class="form-control" v-model="newItem" name="" id="">
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  <button type="button" class="btn btn-primary" v-on:click.prevent="addItem(newItem)" data-dismiss="modal">Salvar</button>
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
      </div>
    </form>
    <card-form-list
    v-bind:items="elements"
    v-on:removeItem="removeItem"
    v-on:updateItem="updateItem"
    ></card-form-list>
  </div>
</template>

<script>
import Errors from "./errors/Errors";
import CardFormList from "./CardFormList";
import { validateInputFormItems } from "@/utils/validate/ItemsValidate.js";
import { validateInputFormElement } from "@/utils/validate/ElementsValidate";

export default {
  name: "FormModal",
  components: { Errors, CardFormList },
  props: ["title", "items", "elements"],
  data() {
    return {
      errors: [],
      selected: "",
      newItem: "",
      item: {
        description: "",
        value: "",
        date: Date
      }
    }
  },
  methods: {
    removeItem(item) {
      console.log("remove");
      this.$emit("removeItem", item);
    },
    updateItem(item) {
      console.log("updateItem");
      this.selected = item.items.description;
      this.item.description = this.selected;
      this.item = item;
    },
    addItem(item) {
      console.log("addItem");
      this.errors = [];
      const { newItem, error } = validateInputFormItems(item);
      this.errors.push(error);
      if (!error.length) {
        this.errors = [];
        this.newItem = "";
        this.$emit("addItem", newItem);
      }
    },
    saveItem(item) {
      console.log("saveItem");
      item.description = this.selected;
      const { newElement, errors } = validateInputFormElement(item);
      this.errors = errors;
      if (!errors.length) {
        if (item.id) {
          console.log("update");
          this.$emit("saveItem", newElement);
        } else {
          console.log("create");
          this.$emit("saveItem", newElement);
        }
        this.clearInputs();
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
.btnAdd {
  margin-top: 32px;
}
</style>