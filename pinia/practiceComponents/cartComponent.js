import cartStore from "../store/cartStore.js";

const { mapState, mapActions } = Pinia;

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  methods: {
    ...mapActions(cartStore, ["removeFromCart", "setCartQuantity"]),
  },
  template: `<div class="bg-light p-4 my-4">
    <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
    <table class="table align-middle" v-else>
      <tbody v-for="(item) in cartList.carts" :key="item.id">
        <tr>
          <td width="100">
            <a href="#" class="text-dark" @click.prevent="removeFromCart(item.id)"
              ><i class="fas fa-times"></i
            ></a>
          </td>
          <td width="100">
            <img
              :src="item.product.imageUrl"
              class="table-image"
              alt=""
            />
          </td>
          <td>{{item.product.title}}</td>
          <td width="200">
            <select name="" id="" class="form-select" :value="item.quantity" @change="(event) => setCartQuantity(item.id,event)">
              <option :value="i" v-for="(i) in  10" :key="i">{{i}}</option>
            </select>
          </td>
          <td width="200" class="text-end">$ {{item.product.price}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }} </td>
        </tr>
      </tfoot>
    </table>
  </div>`,
};
