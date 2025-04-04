import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardState, Requirement } from '@/types/app';

const initialState: DashboardState = {
  aiData: [],
  isPending: false,
  currentCredits: 0,
}

const dashboardSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setAiData: (state, action: PayloadAction<Requirement[]>) => {
      state.aiData = action.payload
    },
    clearAiData: (state) => {
      state.aiData = []
    },
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload
    },
    setCurrentCredits: (state, action: PayloadAction<number>) => {
      state.currentCredits = action.payload
    },
  },
})

export const { setAiData, clearAiData, setIsPending, setCurrentCredits } = dashboardSlice.actions

export default dashboardSlice.reducer
