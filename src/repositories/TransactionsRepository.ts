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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // public getBalance(): Balance {
  //   // TODO
  // }

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

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
