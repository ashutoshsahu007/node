import express from "express";
const router = express.Router();
import Person from "../models/Person.js";

// post router to add a person

// comment adding for testing purposes

router.post("/", async (req, res) => {
  console.log(req.body);
  const person = new Person(req.body);
  try {
    const savedPerson = await person.save();
    console.log("Person created:", savedPerson);
    return res.status(201).json(savedPerson);
  } catch (error) {
    console.error("Error creating person:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("Persons fetched:", persons);
    return res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Person updated:", response);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching persons:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    return res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
