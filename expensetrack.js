document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const expenseList = document.getElementById("expense-list");
    const totalExpenseEl = document.getElementById("total-expense");
  
    // Initialize expenses from local storage or set to an empty array
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    // Function to render expenses
    function renderExpenses() {
      expenseList.innerHTML = "";
      expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense-item");
  
        expenseItem.innerHTML = `
          <span>${expense.description}</span>
          <span>$${expense.amount}</span>
          <span>${expense.date}</span>
          <button class="delete" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
      });
      calculateTotalExpense();
    }
  
    // Function to add expense
    function addExpense(description, amount, date) {
      const newExpense = { description, amount: parseFloat(amount), date };
      expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  
    // Function to delete expense
    window.deleteExpense = function(index) {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    };
  
    // Function to calculate total expense
    function calculateTotalExpense() {
      const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      totalExpenseEl.textContent = total.toFixed(2);
    }
  
    // Event listener for form submission
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = descriptionInput.value;
      const amount = amountInput.value;
      const date = dateInput.value;
  
      if (description && amount && date) {
        addExpense(description, amount, date);
        descriptionInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
      }
    });
  
    // Render expenses on initial load
    renderExpenses();
  });
  
