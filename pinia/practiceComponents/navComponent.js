import cartStore from "../store/cartStore.js";

const { mapState } = Pinia;

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(cartStore, ["cart"]),
  },
  template: `<nav class="navbar bg-light">
    <div class="container-fluid">
      <span class="navbar-brand" href="#">香香麵攤</span>
      <div>
        購物車
        <span class="badge rounded-pill bg-danger text-white">{{cart.length}}</span>
      </div>
    </div>
  </nav>`,
};
