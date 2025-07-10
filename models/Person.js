import mongoose from "mongoose";

// Define the schema for the Person model

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    default: 0,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: Number,
    required: true,
  },
});

// Create the Person model using the schema

const Person = mongoose.model("Personhhh", personSchema);
export default Person;
