const mongoose = require('mongoose');

//contect to mongodb
mongoose
  .connect(
    'mongodb+srv://musa24:musa24@cluster0.navb6.mongodb.net/votes?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('Database is connect');
  })
  .catch((err) => {
    console.log(err);
  });
