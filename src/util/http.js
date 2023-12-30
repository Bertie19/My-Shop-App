export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    const error = new Error("An error occured while fetching the products");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
};

export const getSingleProduct = async (id) => {
  const response = await fetch("https://fakestoreapi.com/products/"+id);

  if (!response.ok) {
    const error = new Error("An error occured while fetching the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
};

export const getUser = async () => {
  const response = await fetch("https://fakestoreapi.com/users/"+1);

  if (!response.ok) {
    const error = new Error("An error occured while fetching the product");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  return data;
};