import productStore from "./productStore.js";

const { defineStore } = Pinia;

export default defineStore("cartStore", {
  state: () => ({
    cart: [],
  }),
  actions: {
    addToCart(productId, qty = 1) {
      // console.log(productId, qty);
      this.cart.push({ productId, qty });
    },
  },
  getters: {
    cartList: ({ cart }) => {
      const { products } = productStore();
      const carts = cart.map((item) => {
        const productInCart = products.find(
          (product) => product.id === item.productId
        );
        return {
          ...item,
          ...productInCart,
          subtotal: item.qty * productInCart.price,
        };
      });
      //   console.log(carts);

      const total = carts.reduce((pre, curr) => pre + curr.subtotal, 0);
      //   console.log(total);
      console.log(carts);

      return {
        carts,
        total,
      };
    },
  },
});
