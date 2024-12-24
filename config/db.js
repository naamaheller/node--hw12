import { connect } from "mongoose";

export function connectToDb() {
    connect(process.env.Db_URL)
        .then(con => console.log("mogo Db connected"))
        .catch(err => {
            console.log("cannot connect mongo db", err);
            process.exit(1)
        })
}