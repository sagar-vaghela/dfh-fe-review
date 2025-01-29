import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../app/modules/people";
import { fetchPeopleAPI } from "../../lib/api/api";

interface PeopleState {
  loading: boolean;
  data: Person[] | null;
  error: string | null;
}

const initialState: PeopleState = {
  loading: false,
  data: [],
  error: null,
};

export const fetchPeople = createAsyncThunk<Person[]>(
  "people/fetchPeople",
  async () => {
    const response = await fetchPeopleAPI();
    return response;
  },
);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPerson(state, action: PayloadAction<Person>) {
      if (state.data) {
        state.data.push(action.payload);
      } else {
        state.data = [action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPeople.fulfilled,
        (state, action: PayloadAction<Person[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload as string;
      });
  },
});
export const { addPerson } = peopleSlice.actions;
export default peopleSlice.reducer;
