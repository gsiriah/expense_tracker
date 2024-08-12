document.addEventListener('DOMContentLoaded', function () {
    loadExpenses();
});

function addOrUpdateExpense() {
    var name = document.getElementById('expenseName').value;
    var amount = document.getElementById('expenseAmount').value;

    if (name && amount) {
        var expenses = getExpenses();
        var expenseId = document.getElementById('expenseId').value;

        if (expenseId !== '') {
            // Update existing expense
            expenses[expenseId].name = name;
            expenses[expenseId].amount = amount;
            clearForm();
        } else {
            // Add new expense
            expenses.push({ name: name, amount: amount });
        }

        saveExpenses(expenses);
        loadExpenses();
    } else {
        alert('Please enter both expense name and amount.');
    }
}

function loadExpenses() {
    var expenses = getExpenses();
    var expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    for (var i = 0; i < expenses.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            ${expenses[i].name}: $${expenses[i].amount}
            <button onclick="editExpense(${i})">Edit</button>
            <button onclick="deleteExpense(${i})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    }
}

function editExpense(id) {
    var expenses = getExpenses();
    document.getElementById('expenseName').value = expenses[id].name;
    document.getElementById('expenseAmount').value = expenses[id].amount;
    document.getElementById('expenseId').value = id;
}

function deleteExpense(id) {
    var confirmDelete = confirm('Are you sure you want to delete this expense?');

    if (confirmDelete) {
        var expenses = getExpenses();
        expenses.splice(id, 1);
        saveExpenses(expenses);
        loadExpenses();
        clearForm();
    }
}

function clearForm() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseId').value = '';
}

function getExpenses() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    return expenses;
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}



