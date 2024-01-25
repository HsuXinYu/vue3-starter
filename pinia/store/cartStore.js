import productStore from "./productStore.js";

const { defineStore } = Pinia;

export default defineStore("cartStore", {
  state: () => ({
    cart: [{ id: new Date().getTime(), productId: 1, quantity: 1 }],
  }),
  actions: {
    addToCart(productId, quantity = 1) {
      //   console.log(productId, quantity);
      const currentCart = this.cart.find(
        (item) => item.productId === productId
      );
      // console.log(currentCart);

      if (currentCart) {
        currentCart.quantity += quantity;
      } else {
        this.cart.push({ id: new Date().getTime(), productId, quantity });
      }
      // console.log(this.cart);
    },
    removeFromCart(id) {
      const index = this.cart.findIndex((item) => item.id === id);
      // console.log(index);
      this.cart.splice(index, 1);
    },
    setCartQuantity(id, event) {
      // console.log(id, event);
      // console.log(event.target.value, typeof event.target.value);

      const currentCart = this.cart.find((item) => item.id === id);
      // *1是為了將字串轉為數字
      currentCart.quantity = event.target.value * 1;
    },
  },
  getters: {
    cartList: ({ cart }) => {
      // console.log(cart);

      //從store取得其他store
      const { products } = productStore();
      // console.log(products);

      //整合cart及products資訊
      const carts = cart.map((item) => {
        console.log(item);
        const product = products.find(
          (product) => product.id === item.productId
        );
        return {
          ...item,
          product,
          subtotal: product.price * item.quantity,
        };
      });
      // console.log(carts);

      const total = carts.reduce((pre, curr) => pre + curr.subtotal, 0);
      // console.log(total);

      return {
        carts,
        total,
      };
    },
  },
});
