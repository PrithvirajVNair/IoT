import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverURL } from '../services/serverURL';

const BASE_URL = `${serverURL}/api/machines`;

export const fetchMachines = createAsyncThunk(
  'machines/fetchMachines',
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const acknowledgeFault = createAsyncThunk(
  'machines/acknowledgeFault',
  async (id) => {
    const response = await axios.patch(`${BASE_URL}/${id}/status`, { status: 'idle' });
    return response.data;
  }
);

export const deleteMachine = createAsyncThunk(
  'machines/deleteMachine',
  async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

const machinesSlice = createSlice({
  name: 'machines',
  initialState: {
    machines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMachines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMachines.fulfilled, (state, action) => {
        state.loading = false;
        state.machines = action.payload;
      })
      .addCase(fetchMachines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(acknowledgeFault.fulfilled, (state, action) => {
        const updatedMachine = action.payload;
        const machine = updatedMachine.machine || updatedMachine;
        const index = state.machines.findIndex(m => m.id === machine.id);
        if (index !== -1) {
          state.machines[index] = machine;
        }
      })
      .addCase(deleteMachine.fulfilled, (state, action) => {
        state.machines = state.machines.filter(m => m.id !== action.payload);
      });
  },
});

export default machinesSlice.reducer;
