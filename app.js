const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerjsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


//SWAGGER
const YAML = require('yamljs');
const specs = YAML.load('./swagger.yaml');




const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const bookRouter = require('./routes/bookRoutes');



const notFoundMiddleware = require('./middleware/Not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan('tiny'));

const corsOptions = {
  origin: '*', // You can replace this with the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 200
  credentials: true,
};

app.use(cors(corsOptions));

const helmet = require('helmet');
const xss = require('xss-clean');


app.set('trust proxy', 100);

app.use(helmet());

app.use(xss());





app.use(express.static('./public'));



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/book', bookRouter);





app.get('/',(req,res) => {
    res.send('<h1>This is my Homepage</h1>')
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.get('/api/v1',(req,res) => {
    console.log(req.signedCookies);
    res.send('This is my Homepage');
});



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

port = process.env.PORT || 3221;

const start = async (req, res) => {
    try {
       await connectDB(process.env.MONGO_URI);
       app.listen(port, 
        console.log(`server is listening on port ${port}`)
       ) 
    } catch (error) {
        console.log(error);
    }
};

start();