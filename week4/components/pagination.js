export default {
  props: ["pagination"],
  data() {
    return {};
  },
  methods: {
    getProduct(page) {
      this.$emit("get-product", page);
    },
  },
  template: `<nav class="d-flex justify-content-center" aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled:pagination.current_page === 1 }"><a class="page-link" href="#" @click.prevent="getProduct(pagination.current_page-1)">Previous</a></li>
      <li class="page-item" v-for="(page) in pagination.total_pages" :key="page"><a class="page-link" href="#" @click="getProduct(page)">{{page}}</a></li>
      <li class="page-item" :class="{ disabled:pagination.current_page === pagination.total_pages }"><a class="page-link" href="#" @click.prevent="getProduct(pagination.current_page+1)">Next</a></li>
    </ul>
  </nav>`,
};
