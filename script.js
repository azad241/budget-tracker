
function saveTransactions(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(index) {
    const transactions = fetchTransactions();
    transactions.splice(index, 1);
    saveTransactions(transactions);
    displayTransactions();
}
function editTransaction(index) {
    const transactions = fetchTransactions();
    const editedAmount = parseFloat(prompt('Enter new amount:'));
    if (isNaN(editedAmount)) {
        alert('Please enter valid amount.');
        return;
    }
    transactions[index].amount = editedAmount;
    saveTransactions(transactions);
    displayTransactions();
}
function fetchTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}
function displayTransactions() {
    const transactions = fetchTransactions();
    const transactionList = document.getElementById('transaction-list');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpenseElement = document.getElementById('total-expense');
    let totalIncome = 0;
    let totalExpense = 0;

    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${transaction.type}: ${transaction.amount}`;
        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTransaction(index);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTransaction(index);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        transactionList.appendChild(listItem);

        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense -= transaction.amount;
        }
    });

    totalIncomeElement.textContent = totalIncome;
    totalExpenseElement.textContent = totalExpense;
}

function addTransaction() {
    const amountInput = document.getElementById('amount');
    let type = ''
    const amount = parseFloat(amountInput.value.trim());
    if (amount > 0) {
        type = 'Income'
    }
    else {
        type = 'Expense'
    }
    if (isNaN(amount)) {
        alert('Please enter valid amount.');
        return;
    }
    const transaction = {
        type,
        amount
    };
    const transactions = fetchTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);
    displayTransactions();
    amountInput.value = '';
}
displayTransactions();