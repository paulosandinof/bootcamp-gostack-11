import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

interface RequestDTO {
  transaction_id: string;
}

class DeleteTransactionService {
  public async execute({ transaction_id }: RequestDTO): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne({
      where: {
        id: transaction_id,
      },
    });

    if (!transaction) {
      throw new AppError("This transaction doesn't exists", 400);
    }

    await transactionRepository.delete(transaction.id);
  }
}

export default DeleteTransactionService;
