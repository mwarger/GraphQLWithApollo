const { DataSource } = require("apollo-datasource");
const lodashId = require("lodash-id");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/users.json");
const db = low(adapter);
db._.mixin(lodashId);

class UserService extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.db = db;
  }

  getUsers(args) {
    const data = this.db.get("users").value();
    return data;
  }

  getUserById(id) {
    const user = this.db.get("users").getById(id).value();
    return user;
  }

  signUp(creds) {
    // implement this
    console.log("implement me");
  }

  signIn() {
    // implement this
    console.log("implement me");
  }
}

module.exports = UserService;
