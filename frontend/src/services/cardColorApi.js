import axios from "axios";

const CARDCOLOR_API = `http://localhost:8080/api/cardColor`;

const handleFetchCardColor = async () => {
  try {
    const response = await axios.get(`${CARDCOLOR_API}/getCardColor`);
    return response.data;
  } catch (error) {
    console.log("Error fetching data from card color", error);
  }
};

const fetchFindCardColor = async (cardcolor_ID) => {
  try {
    const response = await axios.get(
      `${CARDCOLOR_API}/getCardColor/${cardcolor_ID}`
    );

    return response.data;
  } catch (error) {
    console.log("Error finding data from card color", error);
  }
};

const fetchAddCardColor = async ({ cardcolor_name }) => {
  try {
    const response = await axios.post(`${CARDCOLOR_API}/createCardColor`, {
      cardcolor_name: cardcolor_name,
    });

    return response.data;
  } catch (error) {
    console.log("Error adding card color from backend", error);
  }
};
const fetchEditCardColor = async ({ cardcolor_name, cardcolor_ID }) => {
  try {
    const response = await axios.put(`${CARDCOLOR_API}/updateCardColor`, {
      cardcolor_name: cardcolor_name,
      cardcolor_ID: cardcolor_ID,
    });
    return response.data;
  } catch (error) {
    console.log("Error editing card color from backend", error);
  }
};
const fetchDeleteCardColor = async (cardcolor_ID) => {
  try {
    const response = await axios.delete(
      `${CARDCOLOR_API}/deleteCardColor/${cardcolor_ID}`
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting card color from backend", error);
  }
};

export {
  handleFetchCardColor,
  fetchFindCardColor,
  fetchAddCardColor,
  fetchEditCardColor,
  fetchDeleteCardColor,
};
