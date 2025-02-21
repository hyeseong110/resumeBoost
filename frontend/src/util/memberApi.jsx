import React from "react";
import axios from "axios";

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("userEmail", loginParam.userEmail);
  form.append("userPw", loginParam.userPw);
  console.log(loginParam)

  const res = await axios.post(
    "http://localhost:8090/member/login",
    form,
    header
  );
  console.log(res);

  return res.data;
};
