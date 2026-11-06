
import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./config/db";
import Food from "./models/Food";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "../public/images")));

// POST route to insert food data into MongoDB
app.post("/seed", async (req: express.Request, res: express.Response) => {
  try {
    const existingFoods = await Food.countDocuments();

    if (existingFoods > 0) {
      res.status(409).json({
        message: "Food data already exists",
      });
      return;
    }

    const foodData = [
      {
        name: "Boilded Egg",
        price: 10,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/egg.png",
        type: "breakfast",
      },
      {
        name: "RAMEN",
        price: 25,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/ramen.png",
        type: "lunch",
      },
      {
        name: "GRILLED CHICKEN",
        price: 45,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/chicken.png",
        type: "dinner",
      },
      {
        name: "CAKE",
        price: 18,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/cake.png",
        type: "breakfast",
      },
      {
        name: "BURGER",
        price: 23,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/burger.png",
        type: "lunch",
      },
      {
        name: "PANCAKE",
        price: 25,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        image: "/images/pancake.png",
        type: "dinner",
      },
    ];

    await Food.insertMany(foodData);

    res.status(201).json({
      message: "Food data inserted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error inserting food data",
    });
  }
});

// GET route to fetch food data from MongoDB
app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const foodData = await Food.find();
    res.json(foodData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching food data",
    });
  }
});

connectDB().then(() => {
  const port = Number(process.env.PORT) || 9000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
