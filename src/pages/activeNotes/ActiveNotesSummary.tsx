import React, { useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { useAppSelector } from '../../app/hooks';
export const ActiveNotesSummary = () => {

    const active = useAppSelector((state) => state.active.active);
    const archived = useAppSelector((state) => state.active.archived);

    return <>
        <DataTable headers={["Category", "Active", "Archive", "All"]} cells={
            [
                <tr><td>Task</td><td>{active.Task}</td><td>{archived.Task}</td><td>{active.Task + archived.Task}</td></tr>,
                <tr><td>Random Thought</td><td>{active.RandomThought}</td><td>{archived.RandomThought}</td><td>{active.RandomThought + archived.RandomThought}</td></tr>,
                <tr><td>Idea</td><td>{active.Idea}</td><td>{archived.Idea}</td><td>{active.Idea + archived.Idea}</td></tr>,

            ]

        } />

    </>
}