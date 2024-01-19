// 具名引用
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./pagination.js";
import postProductModal from "./postProductModal.js";
import delProductModal from "./delProductModal.js";

let postModal = "";
let delModal = "";

//Options API
const app = createApp({
  data() {
    return {
      //API path
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "lucky_herb_spices",
      products: [],
      //產品資料結構
      // data: {
      //   title: "[賣]動物園造型衣服3",
      //   category: "衣服2",
      //   origin_price: 100,
      //   price: 300,
      //   unit: "個",
      //   description: "Sit down please 名設計師設計",
      //   content: "這是內容",
      //   is_enabled: 1,
      //   imageUrl: "主圖網址",
      //   imagesUrl: [
      //     "圖片網址一",
      //     "圖片網址二",
      //     "圖片網址三",
      //     "圖片網址四",
      //     "圖片網址五",
      //   ],
      // },
      tempProduct: {
        imagesUrl: [],
      },
      event: "",
    };
  },
  components: {
    pagination,
    postProductModal,
    delProductModal,
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.url}/api/user/check`)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
          window.location.replace("login.html");
        });
    },
    showModal(event, product) {
      this.event = event;
      if (event == "post") {
        this.tempProduct = {
          imagesUrl: [],
        };
        postModal.show();
      } else if (event == "del") {
        this.tempProduct = product;
        delModal.show();
      } else if (event == "edit") {
        this.tempProduct = { ...product };
        postModal.show();
      }
    },
    hideModal() {
      if (this.event == "post" || this.event == "edit") {
        postModal.hide();
      } else if ((this.event = "del")) {
        delModal.hide();
      }
    },
    getProduct() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products/all`)
        .then((res) => {
          // console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
          alert(err.data.message);
        });
    },
  },
  mounted() {
    //取得token並檢查用戶資料是否正確
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    // console.log(document.cookie, token);
    axios.defaults.headers.common["Authorization"] = token;
    this.checkAdmin();

    //取得所有產品
    this.getProduct();

    //建立modal實體
    postModal = new bootstrap.Modal("#productModal");
    delModal = new bootstrap.Modal("#delProductModal");
  },
}).mount("#app");
