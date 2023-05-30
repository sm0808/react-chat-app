import React, { useState, useEffect } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = ({ firebase }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');

  const firestore = firebase.firestore();
  const expensesRef = firestore.collection('expenses');

  // Fetch expenses from Firestore on component mount
  useEffect(() => {
    const unsubscribe = expensesRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setNewExpense(event.target.value);
  };

  // Handle add expense
  const handleAddExpense = () => {
    if (newExpense.trim() !== '') {
      expensesRef.add({ expense: newExpense });
      setNewExpense('');
    }
  };

  // Handle delete expense
  const handleDeleteExpense = (expenseId) => {
    expensesRef.doc(expenseId).delete();
  };

  return (
    <div className="container">
      <div className="expense-tracker">
        <h2>Expense Tracker</h2>
        <div>
          <input
            type="text"
            placeholder="Enter expense"
            value={newExpense}
            onChange={handleInputChange}
          />
          <button onClick={handleAddExpense}>Add</button>
        </div>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.expense}
              <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseTracker;
