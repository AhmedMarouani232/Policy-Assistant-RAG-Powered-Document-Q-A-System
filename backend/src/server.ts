import express from "express"
import router from './routes/upload.routes.ts';
import queryRoutes from './routes/query.routes.ts';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Your Nuxt frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// router
app.use('/upload', router);
app.use('/query', queryRoutes);

// Health
app.get('/', (req, res) => {
  res.json({ status: 'Policy Assistant API Ready', endpoints: ['POST /upload', 'POST /query'] });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});