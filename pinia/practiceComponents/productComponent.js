import productsStore from "../store/productsStore.js";
const { mapState } = Pinia;

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(productsStore, ["sortProducts"]),
  },
  template: `<div class="row row-cols-3 my-3 g-4">
    <div class="col" v-for="(product) in sortProducts" :key="product.id">
      <div class="card">
        <img
          :src="product.imageUrl"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body" >
          <h6 class="card-title">
            {{product.title}}
            <span class="float-end">$ {{product.price}}</span>
          </h6>
          <a href="#" class="btn btn-outline-primary w-100"
            >加入購物車</a
          >
        </div>
      </div>
    </div>
  </div>`,
};
