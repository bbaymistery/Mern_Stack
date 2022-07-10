import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//get alll  tours
//!paginatiooonnnnnn here
export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//get single tour
export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
//
export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      console.log(response);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagTours(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    console.log(_id);

    try {
      const response = await api.likeTour(_id);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    //?create tour start
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // *create tour finish

    //?get alllll toruss start
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    //!!!!!!!!!!!!!!!paginatiooon
    //cuurentpagi homw js de extract edirik
    [getTours.fulfilled]: (state, action) => {
      // console.log(action.payload);

      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*get alllll torus  finishh

    //?get single tour start
    [getTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*get single tour finish

    //?get getToursByUser tour start
    [getToursByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*get getToursByUser finish

    //?delete start
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.filter((item) => item._id !== id);
        state.tours = state.tours.filter((item) => item._id !== id);
      }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*delete finish

    //?update start
    [updateTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*update finish

    //?search start
    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*search finish

    // ?get tours by tag
    [getToursByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getToursByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagTours = action.payload; //!!!!!!!! tagToursicinde tuturuq
    },
    [getToursByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    //?start related tours

    [getRelatedTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    },
    [getRelatedTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    //*finish related tours

    [likeTour.pending]: (state, action) => {},
    [likeTour.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeTour.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
