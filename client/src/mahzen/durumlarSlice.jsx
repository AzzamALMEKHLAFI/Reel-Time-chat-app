import host from "../ayar";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const altBilesenGuncelleAsync = createAsyncThunk(
  "durumlar/altBilesenGuncelleAsync",
  async (altBilesen, thunkAPI) => {
    return altBilesen;
  }
);

export const oturumGuncelleAsync = createAsyncThunk(
  "durumlar/oturumGuncelleAsync",
  async (oturum, thunkAPI) => {
    return oturum;
  }
);

const durumlarSlice = createSlice({
  name: "durumlar",
  initialState: {
    soket: null,
    oturum: { sira: "", isim: "", konusma: false },
    kullanici: { sira: "", isim: "" },
    sayfa: "giris",
    altBilesen: "kn",
  },
  reducers: {
    oturumGuncelle: (state, action) => {
      state.oturum = action.payload;
    },
    soketGuncelle: (state, action) => {
      if (state.soket) {
        state.soket.close();
      }

      state.soket = io(`${host}/mektup`);
    },
    kullaniciGuncelle: (state, action) => {
      state.kullanici = {
        sira: action.payload.sira || state.kullanici.sira,
        isim: action.payload.kullanici || state.kullanici.isim,
      };
    },
    sayfaGuncelle: (state, action) => {
      state.sayfa = action.payload;
    },
    altBilesenGuncelle: (state, action) => {
      state.altBilesen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(altBilesenGuncelleAsync.fulfilled, (state, action) => {
      state.altBilesen = action.payload;
    });

    builder.addCase(oturumGuncelleAsync.fulfilled, (state, action) => {
      state.oturum = action.payload;
    });
  },
});

export const {
  oturumGuncelle,
  soketGuncelle,
  kullaniciGuncelle,
  sayfaGuncelle,
  altBilesenGuncelle,
} = durumlarSlice.actions;
export default durumlarSlice.reducer;
