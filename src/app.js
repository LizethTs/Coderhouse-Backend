const express = require("express");
const productsManager = require("./productManager.js");

//servidor
const PORT = 8080;
const app = express();

//Creo el objeto product manager
const products = new productsManager("./src/archivos/productos.json");

//
app.get("/", (req, res) => {
  res.send("PRODUCTOS DISPONIBLES");
});

//Muestra todo los productos y recibe query de límite
app.get("/products", async (req, res) => {
  try {
    let resultado = await products.getProducts();
    //console.log("productos: ", resultado)

    if (req.query.limit) {
      resultado = resultado.slice(0, req.query.limit);
    }

    res.setHeader("Content-Type", "application/json");
    res.send({ filtros: req.query, resultado });
  } catch (error) {
    console.log("no hay productos");
  }
});

//Muestra product id.
app.get("/products/:id", async (req, res) => {
  
  let id = req.params.id;
  id = parseInt(id);
  if (isNaN(id)) {
    return res.send("ERROR, por favor, ingrese un id númerico");
  } else if (id >= 11) {
    return res.send("No existe es PRODUCTO");
  }

  resultado = products.getProducts(id).find((product) => product.id === id);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ resultado });
});
const server = app.listen(PORT, () => {
  console.log(`Server on line en puerto ${PORT}`);
});
