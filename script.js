// get references to the input form and item list elements
const listForm = document.querySelector("form");
const groceryList = document.getElementById("grocery-list");

// initialize the item list with items stored in local storage if availabe
const storedItems = JSON.parse(localStorage.getItem("groceries")) || [];
for (const item of storedItems) {
  const li = listItems(item);
  groceryList.appendChild(li);
}

// add an event listener to the form to add a new item item
listForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = listForm.elements["itemName"];
  const amountInput = listForm.elements["amount"];
  const item = {
    text: nameInput.value,
    amount: amountInput.value,
    checked: false,
  };
  const li = listItems(item);
  groceryList.appendChild(li);
  storedItems.push(item);
  localStorage.setItem("groceries", JSON.stringify(storedItems));
  nameInput.value = "";
  amountInput.value = "";
});

//  function to create a new item list item
function listItems(item) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.checked;

  // decrease opacity and line to strike through if item is checked
  checkbox.addEventListener("change", () => {
    item.checked = checkbox.checked;
    localStorage.setItem("groceries", JSON.stringify(storedItems));
    label.style.opacity = item.checked ? 0.5 : 1;
    li.style.textDecoration = checkbox.checked ? "line-through" : "";
  });
  const label = document.createElement("label");
  label.textContent = `${item.text}    ${item.amount}`;
  label.style.opacity = item.checked ? 0.5 : 1;

  // create a button element and enable it to delete item from localstorage
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteBtn");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    const index = storedItems.indexOf(item);
    if (index !== -1) {
      storedItems.splice(index, 1);
      localStorage.setItem("groceries", JSON.stringify(storedItems));
      li.remove();
    }
  });
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);
  if (item.checked) {
    li.style.textDecoration = "line-through";
  }
  return li;
}
