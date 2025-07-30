import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth';
import { exerciseRoutes } from './routes/exercise';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MathBuddy Backend is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/exercise', exerciseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Authentication Backend server is running on port ${PORT}`);
});

export default app;