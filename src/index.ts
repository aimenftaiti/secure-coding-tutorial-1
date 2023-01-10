import { getInitializedAppDataSource } from "./lib/typeorm";

getInitializedAppDataSource()
    .then(() => {
        // here you can start to work with your database
        console.log("hello world");
    })
    .catch((error) => console.log(error))