const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://SATTBadmin:ZomWCUeNbq2zthwH@sattb.zlfgb1t.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true
    }).then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));