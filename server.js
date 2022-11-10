const express = require('express');
const connectDB = require('./database/db');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const foodRoutes = require('./routes/food');
const filterRoutes = require('./routes/filter');
const orderRoutes = require('./routes/order');

// middleware...
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/food', foodRoutes);
app.use('/uploads',express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.use('/api/order', orderRoutes);

connectDB();
const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log("Listening to app on", port);
});
