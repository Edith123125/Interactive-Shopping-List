//  DOM 
document.addEventListener("DOMContentLoaded", () => {
    // An empty array to hold shopping list items
    let shoppingList = [];

    // References to DOM elements
    const itemInput = document.getElementById("item-input");
    const addBtn = document.getElementById("add-btn");
    const markAllBtn = document.getElementById("mark-all-btn");
    const clearBtn = document.getElementById("clear-btn");
    const shoppingListContainer = document.getElementById("shopping-list");

    //  Rendering the shopping list in the DOM
    function renderList() {
        // Clearing existing list to prevent duplicates
        shoppingListContainer.innerHTML = "";

        // creating list items
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement("li"); // Creates an <li> element
            listItem.textContent = item; // Set the text content directly on <li>

            // Mark Purchased button for individual items
            const markPurchasedBtn = document.createElement("button");
            markPurchasedBtn.textContent = "Mark Purchased"; 
            markPurchasedBtn.addEventListener("click", () => markPurchased(index)); 

            // Double-click to edit an item
            listItem.addEventListener("dblclick", () => editItem(index)); // Enables editing on double-click

            // Append the button to the list item
            listItem.appendChild(markPurchasedBtn);

            // Add the list item to the shopping list container
            shoppingListContainer.appendChild(listItem);
        });
    }

    // Function to add a new item to the shopping list
    addBtn.addEventListener("click", () => {
        const item = itemInput.value; // Get the value from the input field

        if (item !== "") { // Checks if the input is not empty
            shoppingList.push(item); // Adds a new item to the array
            saveToLocalStorage(); // Saves to local storage
            renderList(); // Updates the DOM as to display the new item
            itemInput.value = ""; // Clears the input field after adding the item
        } else {
            alert("Please enter an item!"); // Alert if the input is empty
        }
    });

    // Function to mark an item as purchased
    function markPurchased(index) {
        const listItem = shoppingListContainer.children[index]; 
        listItem.style.textDecoration = "line-through"; // Add strikethrough to indicate purchase
    }

    // Function to mark all items as purchased
    markAllBtn.addEventListener("click", () => {
        const listItems = shoppingListContainer.querySelectorAll("li"); 

        listItems.forEach((listItem) => {
            listItem.style.textDecoration = "line-through"; // Add strikethrough to each item
        });
    });

    // Function to clear the shopping list
    clearBtn.addEventListener("click", () => {
        shoppingList = []; //  shopping list array is cleared
        saveToLocalStorage(); //The cleared list is saved to local storage
        renderList(); //  DOM is updated to reflect the empty list
    });

    // Function to edit an item in the shopping list
    function editItem(index) {
        const newValue = prompt("Edit item:", shoppingList[index]); // Prompt the user for a new value

        if (newValue !== null && newValue !== "") {
            shoppingList[index] = newValue;
            saveToLocalStorage(); 
            renderList(); // Update the DOM to reflect the changes
        }
    }

    // Function to save the shopping list to local storage
    function saveToLocalStorage() {
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList)); 
    }

    // Function to load the shopping list from local storage
    function loadFromLocalStorage() {
        const savedList = localStorage.getItem("shoppingList"); 

        if (savedList) {
            shoppingList = JSON.parse(savedList); 
            renderList(); // Update the DOM to reflect the saved list
        }
    }

    // Loading the shopping list from local storage on page load
    loadFromLocalStorage();
});
