// ExpenseTracker.js
import React, { useState, useEffect } from 'react';
import { useFirebaseApp, useUser } from 'reactfire';

const ExpenseTracker = () => {
  const firebase = useFirebaseApp();
  const user = useUser();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });

  useEffect(() => {
    const expensesRef = firebase.database().ref('expenses');
    expensesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expenseList = Object.values(data);
        setExpenses(expenseList);
      }
    });

    return () => {
      expensesRef.off('value');
    };
  }, [firebase]);

  const handleAddExpense = () => {
    const expensesRef = firebase.database().ref('expenses');
    expensesRef.push({
      ...newExpense,
      userId: user.uid,
      timestamp: Date.now(),
    });
    setNewExpense({ description: '', amount: '', category: '' });
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        {expenses.map((expense) => (
          <div key={expense.timestamp}>
            <strong>Description:</strong> {expense.description}<br />
            <strong>Amount:</strong> ${expense.amount}<br />
            <strong>Category:</strong> {expense.category}<br />
            <br />
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
