import express from 'express';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';
import dashboardRoutes from './handlers/dashboard';
const app: express.Application = express();

app.use(express.json());
orderRoutes(app);
productRoutes(app);
userRoutes(app);
dashboardRoutes(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`starting app on: ${port}`);
});
