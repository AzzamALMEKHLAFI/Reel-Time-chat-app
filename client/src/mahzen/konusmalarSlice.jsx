import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const kullaniciSilAsync = createAsyncThunk(
  "konusmalar/kullaniciSilAsync",
  async (sira, thunkAPI) => {
    return sira;
  }
);

const konusmalarSlice = createSlice({
  name: "konusmalar",
  initialState: {
    konusmalar: new Map(),
    kullanicilar: new Map(),
    mektuplar: new Map(),
  },
  reducers: {
    konusmalarAta: (state, action) => {
      state.konusmalar = new Map(action.payload);
    },
    kullanicilarAta: (state, action) => {
      state.kullanicilar = new Map(action.payload);
    },
    mektuplarAta: (state, action) => {
      state.mektuplar = new Map(action.payload);
    },
    konusmaEkle: (state, action) => {
      state.konusmalar.set(action.payload.sira, action.payload);
    },
    konusmayaGirme: (state, action) => {
      state.konusmalar.get(action.payload).uye = true;
    },
    konusmadanAyril: (state, action) => {
      state.konusmalar.get(action.payload).uye = false;
    },
    kullaniciEkle: (state, action) => {
      state.kullanicilar.set(action.payload.sira, action.payload);
    },
    kullaniciSil: (state, action) => {
      state.kullanicilar.delete(action.payload);
    },
    mektupEkle: (state, action) => {
      const { gonderici, muhteva, tarih, konusma } = action.payload;
      const ilgiliHedef = konusma || gonderici;

      if (state.kullanicilar.has(ilgiliHedef)) {
        state.kullanicilar.get(ilgiliHedef).eklendiMi = true;
      }
      if (state.mektuplar.has(ilgiliHedef)) {
        state.mektuplar.get(ilgiliHedef).push({ gonderici, muhteva, tarih });
      } else {
        state.mektuplar.set(ilgiliHedef, [{ gonderici, muhteva, tarih }]);
      }
    },
    mektupOlustur: (state, action) => {
      const { alici, gonderici, muhteva, tarih } = action.payload;
      if (state.kullanicilar.has(alici)) {
        state.kullanicilar.get(alici).eklendiMi = true;
      }
      if (state.mektuplar.has(alici)) {
        state.mektuplar.get(alici).push({ gonderici, muhteva, tarih });
      } else {
        state.mektuplar.set(alici, [{ gonderici, muhteva, tarih }]);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kullaniciSilAsync.fulfilled, (state, action) => {
      state.kullanicilar.delete(action.payload);
    });
  },
});

export const {
  konusmalarAta,
  kullanicilarAta,
  mektuplarAta,
  konusmaEkle,
  konusmayaGirme,
  konusmadanAyril,
  kullaniciEkle,
  kullaniciSil,
  mektupEkle,
  mektupOlustur,
} = konusmalarSlice.actions;
export default konusmalarSlice.reducer;
