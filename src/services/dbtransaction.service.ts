import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class DBTransactionService {
	constructor(
		private userService: UsersService
	) { }

	// await Customer.create([{ name: 'Test' }], { session: session });
	// doc = await Customer.findOne({ name: 'Test' }).session(session);
	
	async transaction(cb, options = {}) {
		try {
			const session = await this.userService.getModel().db.startSession();
			session.startTransaction();
			try {
				return cb({session, ...options});
			} catch (error) {
				await session.abortTransaction();
				console.log(error);
				console.log('Error in db transaction aborting transaction.');
			} finally {
				session.endSession();
			}
		} catch (error) {
			console.error(error);
			console.error('Transaction couldn\'t create');
		}
	}
}
