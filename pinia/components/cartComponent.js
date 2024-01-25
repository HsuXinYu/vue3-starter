import cartStore from "./cartStore.js";

const { mapState } = Pinia;

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(cartStore, ["cartList"]),
  },
  template: `<div class="bg-light p-4 my-3">
    <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
    <table class="table align-middle" >
      <tbody>
        <tr v-for="(item) in cartList.carts" :key="item.id">
          <td width="100"><a href="#" class="text-dark"><i class="fas fa-times"></i></a></td>
          <td width="100"><img :src="item.imageUrl" class="table-image" alt=""></td>
          <td>{{item.title}}</td>
          <td width="200">
            <select name="" id="" class="form-select">
              <option value="1">1</option>
            </select>
          </td>
          <td width="200" class="text-end">$ {{ item.price }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">
            總金額 NT$ {{ cartList.total }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>`,
};
