import { useState } from "react";

const initialProducts = [
  {
    id: 0,
    name: "Baklava",
    count: 1,
  },
  {
    id: 1,
    name: "Cheese",
    count: 5,
  },
  {
    id: 2,
    name: "Spaghetti",
    count: 2,
  },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId) {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            count: product.count + 1,
          };
        } else {
          return product;
        }
      })
    );
  }

  function handleChef(productId) {
    setProducts(
      products.map((product) => {
        if (productId === product.id) {
          return {
            ...product,
            chef: "Chef" + product.id,
          };
        } else {
          return product;
        }
      })
    );
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name}
          {product.chef} (<b>{product.count}</b>)
          <button
            onClick={() => {
              handleIncreaseClick(product.id);
            }}
          >
            +
          </button>
          <button onClick={()=>{handleChef(product.id)}}> Add chef</button>

        </li>
      ))}
    </ul>
  );
}
