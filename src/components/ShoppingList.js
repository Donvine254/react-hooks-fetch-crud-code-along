import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

const baseUrl = "http://localhost:4000/items";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //useEffect function
  useEffect(() => {
    (async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setItems(data);
    })();
    return () => {
      //clean up function here
    };
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleFormSubmit(NewItem) {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewItem),
    })
      .then((response) => response.json())
      .then((data) => setItems((prevItems) => [...prevItems, data]));
  }
  function handleAddToCart(item) {
    fetch(`${baseUrl}/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        const updatedItems = items.map((existingItem) => {
          if (existingItem.id === updatedItem.id) {
            return updatedItem;
          } else {
            return existingItem;
          }
        });
        setItems(updatedItems);
      });
  }

  function handleItemDelete(item) {
    fetch(`${baseUrl}/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() =>
        setItems(items.filter((existingItem) => existingItem.id !== item.id))
      );
  }

  return (
    <div className="ShoppingList">
      <ItemForm handleFormSubmit={handleFormSubmit} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            onDelete={handleItemDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
