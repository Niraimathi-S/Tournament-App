import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { player } from "../../types/player";

export interface PlayerState {
  players: player[];
  errorMessage: string;
}

const initialState: PlayerState = {
  players: [],
  errorMessage: "",
};

export const getPlayers = createAsyncThunk("players/get", async () => {
  try {
    let response = await axios.get("http://localhost:4000/player");
    console.log("response slice", response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const addPlayer = createAsyncThunk(
  "players/add",
  async (player: player) => {
    const { firstName, lastName, age, category, email, gender } = player;
    try {
      const requestOptions = {
        url: "http://localhost:4000/player",
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
          category: category,
          email: email,
          gender: gender,
        },
      };
      let response = await axios(requestOptions);
      console.log("response slice", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removePlayer = createAsyncThunk(
  "players/delete",
  async (userId: string) => {
    try {
      const requestOptions = {
        url: `http://localhost:4000/player/${userId}`,
        method: "DELETE",
        headers: { "Content-Type": "application/JSON" },
        data: { _id: userId },
      };
      let response = await axios(requestOptions);
      console.log("response slice", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePlayer = createAsyncThunk(
  "players/update",
  async (player: player) => {
    try {
      const { _id, firstName, lastName, age, category, email, gender } = player;
      const requestOptions = {
        url: `http://localhost:4000/player/${_id}`,
        method: "PATCH",
        headers: { "content-type": "application/JSON" },
        data: {
          firstName: firstName,
          lastName: lastName,
          age: age,
          category: category,
          email: email,
          gender: gender,
        },
      };
      let response = await axios(requestOptions);
      console.log("response slice", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const playerSlice = createSlice({
  name: "playersSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getPlayers.fulfilled, (state, action) => {
        state.players = action.payload!;
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        state.players.push(action.payload);
      })
      .addCase(addPlayer.rejected, (state, action) => {
        state.errorMessage = action.error.message ? action.error.message : "";
      })
      .addCase(removePlayer.fulfilled, (state, action) => {
        state.players = state.players.filter(
          (element) => element._id !== action.payload._id
        );
      })
      .addCase(removePlayer.rejected, (state, action) => {
        state.errorMessage = action.error.message ? action.error.message : "";
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        const index = state.players.findIndex(
          (element) => element._id === action.payload._id
        );
        state.players[index] = action.payload;
      })
      .addCase(updatePlayer.rejected, (state, action) => {
        state.errorMessage = action.error.message ? action.error.message : "";
      });
  },
});
// export const { addPlayer, removePlayer, updatePlayer } = playerSlice.actions

export default playerSlice.reducer;
