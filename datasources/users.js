const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const { DataSource } = require("apollo-datasource");
const _ = require("lodash");

class UserService extends DataSource {
  constructor() {
    console.log("in userservice");
    this.db = new JsonDB(new Config("UserDB", true, true, "/"));
    const user = {
      sub: 123,
      email: "user123@gmail.com",
      hash: "asdf1234",
    };
    this.db.push("/users/1", {
      id: 1,
      ...user,
    });
  }

  initialize(config) {}

  getUsers(args) {
    const data = this.db.getData("/users");
    console.log("users", data);

    return data;
  }

  getUserById(id) {
    const user = this.db.getData(`/users/${id}`);
    console.log("user", user);
    return user;
  }
}

module.exports = UserService;
