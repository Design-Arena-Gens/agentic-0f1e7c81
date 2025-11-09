'use client';

import { useState } from 'react';

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 85.50, date: '2025-11-08', category: 'Food' },
    { id: 2, description: 'Gas', amount: 45.00, date: '2025-11-07', category: 'Transport' },
    { id: 3, description: 'Restaurant', amount: 62.30, date: '2025-11-06', category: 'Food' },
    { id: 4, description: 'Utilities', amount: 120.00, date: '2025-11-05', category: 'Bills' }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food'
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const addExpense = (e) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          date: newExpense.date,
          category: newExpense.category
        }
      ]);
      setNewExpense({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Food'
      });
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Expense Dashboard</h1>

        <div style={styles.summary}>
          <div style={styles.totalCard}>
            <h2 style={styles.totalLabel}>Total Expenses</h2>
            <p style={styles.totalAmount}>${totalExpenses.toFixed(2)}</p>
          </div>

          <div style={styles.categoryGrid}>
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} style={styles.categoryCard}>
                <span style={styles.categoryLabel}>{category}</span>
                <span style={styles.categoryAmount}>${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={addExpense} style={styles.form}>
          <h3 style={styles.formTitle}>Add New Expense</h3>
          <div style={styles.formGrid}>
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              step="0.01"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              style={styles.input}
              required
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              style={styles.input}
              required
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              style={styles.input}
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" style={styles.addButton}>Add Expense</button>
        </form>

        <div style={styles.expenseList}>
          <h3 style={styles.listTitle}>Recent Expenses</h3>
          {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
            <div key={expense.id} style={styles.expenseItem}>
              <div style={styles.expenseInfo}>
                <span style={styles.expenseDesc}>{expense.description}</span>
                <span style={styles.expenseCategory}>{expense.category}</span>
                <span style={styles.expenseDate}>{expense.date}</span>
              </div>
              <div style={styles.expenseActions}>
                <span style={styles.expenseAmount}>${expense.amount.toFixed(2)}</span>
                <button onClick={() => deleteExpense(expense.id)} style={styles.deleteButton}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '30px',
    textAlign: 'center'
  },
  summary: {
    marginBottom: '30px'
  },
  totalCard: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  totalAmount: {
    fontSize: '42px',
    fontWeight: '700',
    margin: '0'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px'
  },
  categoryCard: {
    backgroundColor: '#f7fafc',
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  categoryLabel: {
    fontSize: '14px',
    color: '#718096',
    fontWeight: '500'
  },
  categoryAmount: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2d3748'
  },
  form: {
    backgroundColor: '#f7fafc',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#2d3748'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '16px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  addButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  expenseList: {
    marginTop: '20px'
  },
  listTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#2d3748'
  },
  expenseItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  expenseInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  expenseDesc: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748'
  },
  expenseCategory: {
    fontSize: '12px',
    color: '#718096',
    backgroundColor: '#e2e8f0',
    padding: '2px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    width: 'fit-content'
  },
  expenseDate: {
    fontSize: '12px',
    color: '#a0aec0'
  },
  expenseActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  expenseAmount: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#667eea'
  },
  deleteButton: {
    backgroundColor: '#fc8181',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '1'
  }
};
