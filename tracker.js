// Expense Tracker App

// HTML structure provided in index.html

// JavaScript
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");
const totalExpensesElement = document.getElementById("total-expenses");
const categoryBreakdownElement = document.getElementById("category-breakdown");
const expenseListElement = document.getElementById("expense-list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
  // Update total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpensesElement.textContent = totalExpenses.toFixed(2);

  // Update category breakdown
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  categoryBreakdownElement.innerHTML = Object.entries(categoryTotals)
    .map(([category, total]) => `<li>${category}: $${total.toFixed(2)}</li>`)
    .join("");

  // Update expense list
  expenseListElement.innerHTML = expenses
    .map(
      (expense, index) => `
      <li>
        ${expense.name} - $${expense.amount.toFixed(2)} (${expense.category})
        <button onclick="deleteExpense(${index})">Delete</button>
      </li>`
    )
    .join("");
}

function addExpense(event) {
  event.preventDefault();

  const name = expenseNameInput.value;
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value;

  expenses.push({ name, amount, category });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  expenseNameInput.value = "";
  expenseAmountInput.value = "";
  expenseCategoryInput.value = "Food";

  updateUI();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateUI();
}

expenseForm.addEventListener("submit", addExpense);

// Initialize UI on page load
updateUI();
