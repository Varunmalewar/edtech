import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        console.log("Making API call for categoryId:", categoryId);
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});
        
        console.log("API response:", response);

        if(!response?.data?.success)
            throw new Error(response?.data?.message || "Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error?.response?.data?.message || error.message || "Failed to load catalog data");
    result = error.response?.data || { success: false, message: error.message };
  }
  toast.dismiss(toastId);
  return result;
}

