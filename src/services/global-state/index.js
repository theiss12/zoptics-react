
import { createSlice, configureStore } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
    name: "notifications",

    initialState: {
        indexed: 0,
        items: []
    },

    reducers: {
        addNotification: (state, action) => {
            return {
                ...state,
                items: [...state.items, action.payload],
                indexed: state.indexed + 1
            };
        },

        removeNotificationById: (state, action) => {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        }
    }
});

export const { addNotification, removeNotificationById } = notificationsSlice.actions;

export const store = configureStore({
    reducer: {
        // counter: counterSlice.reducer,
        notifications: notificationsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

// store.subscribe(() => console.log(store.getState().notifications.items));

export const notify = message => {
    store.dispatch(addNotification({
        id: store.getState().notifications.indexed,
        message
    }));
};