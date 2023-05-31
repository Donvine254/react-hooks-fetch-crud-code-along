import React from "react";

function Item({ item, onAddToCart, onDelete }) {
 
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={()=>onAddToCart(item)}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={()=>onDelete(item)} >Delete</button>
    </li>
  );
}

export default Item;
