const mongoose = require("mongoose");
const Role = require("./models/Role");
require("dotenv").config();

const start = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const roles = [{ value: "USER" }, { value: "ADMIN" }];

    for (const role of roles) {
      const existingRole = await Role.findOne({ value: role.value });
      if (!existingRole) {
        const newRole = new Role(role);
        await newRole.save();
        console.log(`Role ${role.value} added to the database.`);
      } else {
        console.log(`Role ${role.value} already exists in the database.`);
      }
    }

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

start();
