const URIAPI = "http://localhost:3000/products/";

const getProducts = async () => {
  try {
    const response = await fetch(URIAPI);
    const data = await response.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = { getProducts };
