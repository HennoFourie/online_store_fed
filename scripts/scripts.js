//Get the button
var toTopButton = document.getElementById("topButton");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Initialize and add the map
function initMap() {
  // The location of Cape Town
  const capetown = { lat: -33.9036, lng: 18.4205 };
  // The map, centered at Cape Town
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: capetown,
  });
  // The marker, positioned at Cape Town
  const marker = new google.maps.Marker({
    position: capetown,
    map: map,
  });
}


// Lookbook lightbox
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});


// Shop application
new Vue({
  el: '#app',
  data: {
    cartitems: JSON.parse(localStorage.getItem('STORE_CART')) || [],
    isShowingCart: false,
    products: [
      {
        id: 1,
        picture: 'images/shop_oak_dining_table.jpg',
        name: "4 Seater Oak Dining Table",
        description:
          "The oak dining table is perfect for interior or exterior design. The white clear oak finish in the top convene with the black metal legs.",
        price: 5999,
        inStock: 15
      },
      {
        id: 2,
        picture: 'images/shop_round_wooden_table.jpg',
        name: "Round Wooden Leg Table",
        description:
          "Modern, Urban and chic. The round dining table is the perfect option for small spaces.",
        price: 1999,
        inStock: 35
      },
      {
        id: 3,
        picture: 'images/shop_dining_chair.jpeg',
        name: "Urban Dining Chair",
        description:
          "The upholstered dining carver features slender arms and tapered solid wood legs for luxuriously long and comfortable dinners.",
        price: 3599,
        inStock: 6
      },
      {
        id: 4,
        picture: 'images/shop_fabric_dining_chair.jpg',
        name: "Fabric Dining Chair",
        description:
          "Both elegant and urban. We have made the chair extra sturdy to relax for hours after diner. Available in fabric or in leather.",
        price: 899,
        inStock: 0
      },
      {
        id: 5,
        picture: 'images/shop_leather_couch.jpeg',
        name: "One Seater Leather Couch",
        description:
          "Our one seater couch deserves a double take, it's one of our most handsome upholstered couch designs which simply exudes sophistication and sexiness.",
        price: 9999,
        inStock: 2
      },
      {
        id: 6,
        picture: 'images/shop_grey_chair.jpeg',
        name: "Occasional Dark Grey Armchair",
        description:
          "The occasional armchair is where you go to unwind, unplug, and relax. But be careful, others will try to occupy “your chair”. Share the chair love but not your chair.",
        price: 6499,
        inStock: 20
      },
      {
        id: 7,
        picture: 'images/shop_velvet_sofa.jpeg',
        name: "3 Seater Emerald Green Velvet Sofa",
        description:
          "Bit's one of our most handsome upholstered couch designs which simply exudes sophistication and sexiness. Uncomplicated and fuss-free (just how we like 'em).",
        price: 18999,
        inStock: 4
      },
    ]
  },
  watch: {
    cartitems: {
      deep: true,
      handler(newValue) {
        localStorage.setItem('STORE_CART', JSON.stringify(newValue));
      }
    }
  },
  computed: {
    cartTotal: function () {
      var total = 0;
      this.cartitems.forEach(function (item) {
        total += item.quantity * item.product.price;
      });
      return total;
    },
    taxAmount: function () {
      return this.cartTotal * 15 / 100;
    }
  },
  filters: {
    currency: function (value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "ZAR",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
  },
  methods: {
    removeItemFromCart: function (cartItem) {
      var index = this.cartitems.indexOf(cartItem);

      if (index !== -1) {
        this.cartitems.splice(index, 1);
      }
    },
    checkout: function () {
      if (confirm('Are you sure that you want to purchase these products?')) {
        this.cartitems.forEach(function (item) {
          item.product.inStock += item.quantity;
        });

        this.cartitems = [];
      }
    },
    addProductToCart: function (product) {
      var cartItem = this.getCartItem(product);

      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        this.cartitems.push({
          product: product,
          quantity: 1
        });
      }
      product.inStock--;
    },
    increaseQuantity: function (cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    decreaseQuantity: function (cartItem) {
      cartItem.quantity--;
      cartItem.product.inStock++;
      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    getCartItem: function (product) {
      for (var i = 0; i < this.cartitems.length; i++) {
        if (this.cartitems[i].product.id === product.id) {
          return this.cartitems[i];
        }
      }

      return null;
    }
  }
})