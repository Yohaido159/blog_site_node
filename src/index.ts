import './config';
import app from './server/app';

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});