import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from "./types";
//@route  api/profile/me
//@desc   get current user profile
//@access private
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg },
    });
  }
};
//@route  api/profile
//@desc   create or update propfile
//@access private
export const createprofile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/profile", formData, config);
    console.log(res.data, "data");
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "profile updated" : "profile created"));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) console.log(errors);
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};
