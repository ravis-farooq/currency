import axios from "axios";
// import toast from "react-hot-toast";

const apiServer: string = import.meta.env.VITE_SERVER_URL;

export const fetchCurrencies = async <T>(
  path: string
): Promise<{ data?: T; error?: string }> => {
  try {
    const uri = `${apiServer}${path}`;

    const res = await axios.get(uri);

    return { data: res.data };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
};
export const fetchExchangeRate = async <T>(
  path: string
): Promise<{ data?: T; error?: string }> => {
  try {
    const uri = `${apiServer}${path}`;

    const res = await axios.get(uri);

    return { data: res.data };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
};
