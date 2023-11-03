const fs = require("fs");

class ProductManager {
  constructor(rutaArchivo) {
    this.path = rutaArchivo;
  }

  /**
   * método getProducts --> leer archivos de productos y devolver todos en arreglo
   */

  getProducts() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      return [];
    }
  }

  /**
   * método getProductById --> recibir ID, leer archivo, buscar el producto con id especificado y devolver formato objeto.
   */

  getProductById(id) {
    const productos = this.getProducts();
    let producto = productos.find((producto) => producto.id === id);

    if (!producto) {
      console.log("not found");
      return;
    }

    return producto;
  }

  /**
   * método updateProduct
   */

  updateProduct(id, actualizarProducto) {
    const productos = this.getProducts();
    console.log(productos);
    let productosActualizado =
      productos.length &&
      productos.map((producto) => {
        if (producto.id === id) {
          return {
            id: producto.id,
            title: actualizarProducto.title
              ? actualizarProducto.title
              : producto.title,
            description: actualizarProducto.description
              ? actualizarProducto.description
              : producto.description,
            price: actualizarProducto.price
              ? actualizarProducto.price
              : producto.price,
            thumbnail: actualizarProducto.thumbnail
              ? actualizarProducto.thumbnail
              : producto.thumbnail,
            code: actualizarProducto.code
              ? actualizarProducto.code
              : producto.code,
            stock: actualizarProducto.stock
              ? actualizarProducto.stock
              : producto.stock,
          };
        } else {
          return producto;
        }
      });
    fs.writeFileSync(this.path, JSON.stringify(productosActualizado, null, 5));
  }

  /**
   * método deleteProduct --> debe recibir ID y eliminar el producto que tenga ese id en el archivo.
   */

  deleteProduct(id) {
    const productos = this.getProducts();

    let productosFiltrados = productos.filter((producto) => producto.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(productosFiltrados, null, 5));
  }

  /**
   * método addProduct
   */

  addProduct(title, description, price, thumbnail, code, stock) {
    let productos = this.getProducts();

    let id = this.getProductIdNumber();

    if (title && description && price && thumbnail && code && stock) {
      let newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      productos.push(newProduct);

      fs.writeFileSync(this.path, JSON.stringify(productos, null, 5));
    } else {
      console.log(
        "Para agregar un producto, todo los campos son obligatorios.."
      );
    }
  }
  /**
   * retorna un nuevo id.
   */
  getProductIdNumber() {
    let id = 1;

    const productos = this.getProducts();
    if (productos.length > 0) {
      id = productos[productos.length - 1].id + 1;
    }

    return id;
  }
}

// let productManager = new ProductManager("./src/archivos/productos.json");

// productManager.addProduct(
//   "producto prueba",
//   "este es un producto prueba",
//   200,
//   "sin imagen",
//   "abc123",
//   25
// );

// console.log(productManager.getProducts());
//console.log(productManager.getProductById(4));
//productManager.updateProduct(2, { code: "codigonuevo", price: 7676 });
//productManager.deleteProduct(2);


// module.exports

module.exports = ProductManager;