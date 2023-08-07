import React, { ChangeEvent, useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { Button, Container, Modal } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNote, editNote, removeNote, changeIsArchived } from '../../redux/NotesSlice';

import Form from 'react-bootstrap/Form';
import { CategoryType, Note } from '../../models/Note';
import { store } from '../../app/store';
import { ActiveNotesSummary } from './ActiveNotesSummary';

export const ActiveNotes = () => {



    const notes = useAppSelector((state) => state.active.notes.filter((x)=>!x.isArchived));
    const dispatch = useAppDispatch();


    //create modal
    const [crateShow, setCreateShow] = useState(false);
    const handleCreateClose = () => setCreateShow(false);
    const handleCreateShow = () => setCreateShow(true);
    const [createTextContent, setCreateTextContent] = useState("");
    const [createCategory, setCreateCategory] = useState<CategoryType>("Idea");


    //change modal
    const [changeShow, setChangeShow] = useState(false);
    const handleChangeClose = () => setChangeShow(false);
    const handleChangeShow = () => setChangeShow(true);
    const [changeTextContent, setChangeTextContent] = useState("");
    const [changeCategory, setChangeCategory] = useState<CategoryType>("Idea");

    const [changeItem, setChangeItem] = useState<Note>(new Note(0, '', 'Idea', new Date()));



    const handleValue = (e: any) => {
        if (e.target.id === "create-text-content") {
            setCreateTextContent(e.target.value);
        }
        if (e.target.id === "create-category") {
            setCreateCategory(e.target.value);
        }


        if (e.target.id === "change-text-content") {
            setChangeTextContent(e.target.value);
        }
        if (e.target.id === "change-category") {
            setChangeCategory(e.target.value);
        }
    }



    return <div>
        <Container className="justify-content-md-center">

            <Button className='mt-4' variant="secondary" onClick={handleCreateShow}>
                Create element
            </Button>

            <DataTable headers={["Id", "Content", "Category", "Dates", "Time of creation", "Actions"]} cells={notes.map((item, index) => {
                return <tr key={index}>
                    <td>{item.getId()}</td>
                    <td>{item.getTextContent()}</td>
                    <td>{item.getCategory()}</td>

                    <td>{item.getMentionedDates()}</td>
                    <td>{item.getTimeOfCreation()}</td>
                    <td>
                        <i className="fa-solid fa-pen me-2" onClick={() => {
                            setChangeItem(item);
                            setChangeTextContent(item.getTextContent());
                            setChangeCategory(item.getCategory());
                            handleChangeShow();
                        }}></i>
                        <i className="fa-solid fa-box-archive mx-2" onClick={() => {
                            dispatch(changeIsArchived(item));

                        }}></i>
                        <i className="fa-solid fa-trash ms-2" onClick={() => { dispatch(removeNote(item)) }} ></i>
                    </td>
                </tr>
            })} />

            <ActiveNotesSummary />


            {/* New element modal */}
            <Modal variant="secondary" show={crateShow} aria-labelledby="contained-modal-title-vcenter" onHide={handleCreateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create element</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form.Control onChange={handleValue} id="create-text-content" as="textarea" aria-label="With textarea" />

                    <Form.Select onChange={handleValue} id="create-category" aria-label="Default select example">
                        <option disabled>category</option>
                        <option value="Idea">Idea</option>
                        <option value="Random Thought">Random Thought</option>
                        <option value="Task">Task</option>
                    </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleCreateClose();
                        dispatch(addNote({ textContent: createTextContent, category: createCategory }))
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit modal */}
            <Modal variant="secondary" show={changeShow} aria-labelledby="contained-modal-title-vcenter" onHide={handleChangeClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create element</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <Form.Control defaultValue={changeItem.getTextContent()} onChange={handleValue} id="change-text-content" as="textarea" aria-label="With textarea" />

                    <Form.Select defaultValue={changeItem.getCategory()} onChange={handleValue} id="change-category" aria-label="Default select example">
                        <option disabled>category</option>
                        <option value="Idea">Idea</option>
                        <option value="Random Thought">Random Thought</option>
                        <option value="Task">Task</option>
                    </Form.Select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleChangeClose();
                        dispatch(editNote({ id: changeItem.getId(), textContent: changeTextContent, category: changeCategory }));
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </div>
}