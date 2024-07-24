import { Router } from 'express';
import { getTransaction, insertTransaction, updateTransaction, deleteTransaction, getAllTransaction, getYearlySalesSummary, getSalesDetails, getUserTransactions } from '../controllers/transaction-controller';

const router = Router();

router.get('/transactions', getAllTransaction);
router.get('/transaction/:id', getTransaction);
router.post('/transactions', insertTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/transaction/sales/:year', getYearlySalesSummary);
router.get('/transaction/sales-detail/:year/:month', getSalesDetails);
router.get('/transaction/user-transactions/:userID/:year/:month', getUserTransactions);

export default router;
