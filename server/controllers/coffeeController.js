import CoffeeModel from "../models/coffeeModel.js";

export const addCoffee = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file.filename;

    const newCoffee = new CoffeeModel({
      name,
      description,
      price,
      image,
    });

    await newCoffee.save();

    res
      .status(201)
      .json({ success: true, message: "Kava Pridėta", data: newCoffee });
  } catch (error) {
    console.error("Error adding coffee:", error);
    res
      .status(500)
      .json({ success: false, message: "Kilo klaida pridedant kavą" });
  }
};

export const removeCoffee = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await CoffeeModel.findByIdAndDelete(id);
    if (result) {
      res
        .status(200)
        .json({ success: true, message: "Kava sėkmingai pašalinta" });
    } else {
      res.status(404).json({ success: false, message: "Kava nerasta" });
    }
  } catch (error) {
    console.error("Error removing coffee:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCoffeeList = async (req, res) => {
  try {
    const coffees = await CoffeeModel.find();
    res.status(200).json({ success: true, data: coffees });
  } catch (error) {
    console.error("Error fetching coffee list:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
