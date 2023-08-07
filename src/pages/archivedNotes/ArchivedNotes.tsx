import React, { ChangeEvent, useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { Button, Container, Modal } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { addNote, editNote, removeNote, changeIsArchived } from '../../redux/NotesSlice';
import Form from 'react-bootstrap/Form';
import { CategoryType, Note } from '../../models/Note';

export const ArchivedNotes = () => {

    const notes = useAppSelector((state) => state.active.notes.filter((x)=>x.isArchived));
    const dispatch = useAppDispatch();





    //change modal
    const [changeShow, setChangeShow] = useState(false);
    const handleChangeClose = () => setChangeShow(false);
    const handleChangeShow = () => setChangeShow(true);
    const [changeTextContent, setChangeTextContent] = useState("");
    const [changeCategory, setChangeCategory] = useState<CategoryType>("Idea");

    const [changeItem, setChangeItem] = useState<Note>(new Note(0, '', 'Idea', new Date()));



    const handleValue = (e: any) => {
        if (e.target.id === "change-text-content") {
            setChangeTextContent(e.target.value);
        }
        if (e.target.id === "change-category") {
            setChangeCategory(e.target.value);
        }
    }



    return <div>
        <Container className="justify-content-md-center">



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