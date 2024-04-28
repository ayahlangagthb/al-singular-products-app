const BASE_URL = 'http://localhost:5080/api/ProductSales'; // Base URL for the API (in future i should remember to add this to a property file)
//because the host name may change dependiing on the port is app is ran.
// Function to handle HTTP errors
async function handleErrors(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error: ${response.status} - ${errorText}`);
  }
  return response;
}

// Function to fetch all products
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/Products`);
    await handleErrors(response);
    const responseData = await response.json();
    const { data } = responseData; // Extract the 'data' array from the response
    return data; // Return the 'data' array
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
}

// Function to fetch product sales by productId
export async function getProductSales(productId) {
  try {
    const response = await fetch(`${BASE_URL}/GetProductSales?productId=${productId}`);
    await handleErrors(response);
    const responseData = await response.json();
    const { data } = responseData; // Extract the 'data' array from the response
    return data; // Return the 'data' array
  } catch (error) {
    throw new Error('Failed to fetch product sales');
  }
}
