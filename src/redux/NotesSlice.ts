import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, CategoryType } from "../models/Note";
import { updateSummary } from "../helpers/SummaryHelper";

const notesSlice = createSlice({
    name: "notesSlice",
    initialState: {
        notes: [
            new Note(1, "test text content1", "Random Thought", new Date("2021-03-02")),
            new Note(2, "test text content2", "Task", new Date("2022-06-16")),
            new Note(3, "I’m gonna have a dentist appointment on the 3/12/2021, I moved it from 15/5/2021", "Task", new Date("2023-08-15")),
            new Note(4, "test text content4", "Random Thought", new Date("2022-01-25")),
            new Note(5, "test text content5", "Task", new Date("2021-03-26")),
            new Note(6, "test text content6", "Idea", new Date("2023-05-09"))
        ],
        archived: { Task: 0, RandomThought: 0, Idea: 0 },
        active: { Task: 3, RandomThought: 2, Idea: 1 },
        changesCount: 0
    },
    reducers: {
        addNote(state, action: PayloadAction<{ textContent: string, category: CategoryType }>) {
            if (action.payload.textContent === "") {
                console.warn("attempt to create note without text");
                return;
            }

            state.notes.push(new Note(Math.max(...state.notes.map(x => x.getId())) + 1, action.payload.textContent, action.payload.category, new Date()));
            updateSummary(state);
        },

        changeIsArchived(state, action: PayloadAction<Note>) {
            console.log(state.active.Task);



            for (const iterator of state.notes) {
                if (iterator.getId() == action.payload.getId()) {
                    iterator.setIsArchived(!iterator.isArchived);
                }
            }

            state.changesCount += 1;
            updateSummary(state);
        },

        removeNote(state, action: PayloadAction<Note>) {

            state.notes = state.notes.filter(
                (note) => note.id !== action.payload.id
            );
           updateSummary(state);
        },

        editNote(state, action: PayloadAction<{ id: number, textContent: string, category: CategoryType }>) {
            if (action.payload.textContent === "") {
                console.warn("attempt to create note without text");
                return;
            }
            for (const item of state.notes) {
                if (item.getId() == action.payload.id) {
                    item.setTextContent(action.payload.textContent);
                    item.setCategory(action.payload.category);
                }
            }
            updateSummary(state);
        },

       
    },
});

export const { addNote, changeIsArchived, removeNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;