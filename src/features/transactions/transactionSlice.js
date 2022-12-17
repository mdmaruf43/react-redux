import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createTransaction, deleteTransaction, editTransaction, getTransaction } from "./transactionAPI"

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    editing: {},
}

// async thunks
export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
    const transactions =  await getTransaction();

    return transactions;
}); 


export const createFetchTransaction = createAsyncThunk('transactions/createFetchTransaction', async (data) => {
    const transaction = await createTransaction(data);

    return transaction;
});

export const editFetchTransaction = createAsyncThunk('transactions/editFetchTransaction', async ({id, data}) => {
    const changeTransaction = await editTransaction(id, data);

    return changeTransaction;
});


export const deleteFetchTransaction = createAsyncThunk('transactions/deleteFetchTransaction', async (id) => {
    const removeTransaction = await deleteTransaction(id);

    return removeTransaction;
});

// create slice 

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state, action) => {
            state.editing = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
                state.transactions = [];
            })
            .addCase(createFetchTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createFetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions.push(action.payload);
            })
            .addCase(createFetchTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
            .addCase(editFetchTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(editFetchTransaction.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError = false;
                const indexOfTransaction = state.transactions.findIndex(t => t.id === action.payload.id);
                state.transactions[indexOfTransaction] = action.payload;
            })
            .addCase(editFetchTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
            .addCase(deleteFetchTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(deleteFetchTransaction.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError = false;
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg);
            })
            .addCase(deleteFetchTransaction.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
    }
})

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;