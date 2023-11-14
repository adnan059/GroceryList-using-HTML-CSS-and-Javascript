const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

//console.log(itemsArray);

const dateElement = document.getElementById("date");
const addItemBtn = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
const groceryForm = document.forms["groceryForm"];
const searchElement = document.getElementById("searchBar");
const clearAllElement = document.getElementById("clearAll");

createItem = (itemInputElement) => {
  const newValue = itemInputElement.value.toString().toLowerCase();

  if (!newValue) {
    alert("Please, enter something.");
    return;
  }

  if (itemsArray.includes(newValue)) {
    alert("You already have that item in your list!");
    return;
  }
  itemsArray.unshift(newValue);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  if (itemsArray.length < 2) {
    location.reload();
  }
};

const deleteItem = () => {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (confirm("Do you want to delete this item?")) {
        itemsArray.splice(i, 1);
        localStorage.setItem("items", JSON.stringify(itemsArray));
        location.reload();
      } else {
        return;
      }
    });
  });
};

const editItem = () => {
  const editBtns = document.querySelectorAll(".editBtn");
  const updateControllers = document.querySelectorAll(".updateControllers");
  const inputs = document.querySelectorAll(
    ".inputController .itemContainer textarea"
  );

  editBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      updateControllers[i].style.display = "block";
      inputs[i].disabled = false;
      inputs[i].focus();
    });
  });
};

const saveItem = () => {
  const saveBtns = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(
    ".inputController .itemContainer textarea"
  );
  const updateControllers = document.querySelectorAll(".updateControllers");

  saveBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const updatedValue = inputs[i].value.toString().toLowerCase();

      if (!updatedValue) {
        alert("Please, enter something.");
        return;
      }

      if (itemsArray.includes(updatedValue)) {
        alert("You already have that item in your list!");
        return;
      }

      itemsArray[i] = updatedValue;
      inputs[i].disabled = true;
      updateControllers[i].style.display = "none";
      localStorage.setItem("items", JSON.stringify(itemsArray));
    });
  });
};

const cancelItem = () => {
  const cancelBtns = document.querySelectorAll(".cancelBtn");
  const updateControllers = document.querySelectorAll(".updateControllers");
  const inputs = document.querySelectorAll(
    ".inputController .itemContainer textarea"
  );

  cancelBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      updateControllers[i].style.display = "none";
      inputs[i].value = itemsArray[i];
      inputs[i].disabled = true;
    });
  });
};

const displayItems = () => {
  let items = "";
  const lth = itemsArray.length;
  if (lth < 1) {
    items += `<h1 style="color: red; letter-spacing: 1px">List is Empty!</h1>`;
    itemList.style.justifyContent = "center";
  } else {
    for (let i = 0; i < lth; i++) {
      items += `  <div class="item">
            <div class="inputController">
              <div class="itemContainer">
                <span>${i + 1}</span>
                <textarea type="text" name="item" id="item" disabled>${
                  itemsArray[i]
                }</textarea
                >
              </div>

              <div class="editControllers">
                <i class="fa-solid fa-trash deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
              </div>
            </div>

            <div class="updateControllers">
              <button class="saveBtn">Save</button>
              <button class="cancelBtn">Cancel</button>
            </div>
          </div>`;
      itemList.style.justifyContent = "flex-start";
    }
  }

  itemList.innerHTML = items;
  deleteItem();
  editItem();
  saveItem();
  cancelItem();
};

groceryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemInputElement = document.getElementById("itemInput");
  createItem(itemInputElement);
  itemInputElement.value = "";
  displayItems();
});

searchElement.addEventListener("input", (e) => {
  const searchText = e.target.value.toString().toLowerCase();

  const items = document.querySelectorAll(
    "#itemList .item .inputController .itemContainer textarea"
  );
  items.forEach((singleItem, i) => {
    const isVisible =
      singleItem.value.toLowerCase().includes(searchText) &&
      singleItem.value.toLowerCase().startsWith(searchText);

    singleItem.parentElement.parentElement.parentElement.classList.toggle(
      "hide",
      !isVisible
    );
  });
});

if (itemsArray.length < 1) {
  clearAllElement.style.display = "none";
} else {
  clearAllElement.style.display = "block";
}

clearAllElement.onclick = () => {
  if (confirm("Do you want to delete all the items?")) {
    localStorage.clear("items");
    location.reload();
    return;
  } else {
    return;
  }
};

window.onload = () => {
  displayItems();
};
