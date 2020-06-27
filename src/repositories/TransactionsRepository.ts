import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public transactionsWithBalance(): TransactionsWithBalance {
    const transactionsWithBalance = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };

    return transactionsWithBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error('title must be "income" or "outcome"');
    }

    if (value <= 0) {
      throw new Error('value must be greater than 0');
    }

    const transaction = new Transaction({
      title,
      type,
      value,
    });
    console.log(transaction);
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
