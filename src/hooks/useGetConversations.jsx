import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetConversations = () => {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConversations = async () => {
      if (!authUser?._id) return;

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8080/api/v1/user/conversations");
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, [authUser?._id, dispatch]);
};

export default useGetConversations; 