import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../util/cookieUtil";
import { loginPost } from "../util/memberApi";

const initState = {
  userEmail: "",
};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.userEmail) {
    memberInfo.userEmail = decodeURIComponent(memberInfo.userEmail);
    memberInfo.role = decodeURIComponent(memberInfo.role);
  }
  console.log(memberInfo);
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login.....");
      const data = action.payload;

      console.log(data);

      return { email: data.userEmail };
    },
    logout: (state, action) => {
      console.log("logout....");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");

        const payload = action.payload;

        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }

        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
