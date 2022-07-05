import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import "./t.css";
import { listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteCreate = useSelector((state) => state.noteCreate);
  const { succes: succesCreate } = noteCreate; //create noda tikliyanda sonra bura gecidde sayfa otomatik fire olunmurdu Bunu ona gore yazdg success olanda otomatik yenilenecek
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //  dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userInfo, successDelete, succesCreate, successUpdate]);

  return (
    <MainScreen title={`Welcome back ${userInfo?.name}`}>
      <Link to="/createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new button
        </Button>
      </Link>
      {error && <Error variant="danger"> {error}</Error>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {errorDelete && <Error variant="danger">{errorDelete}</Error>}
      {notes?.map((note) => {
        return (
          <Accordion key={note._id} defaultActiveKey={note._id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header as={Card.Text} variant="link" className="osps">
                Accordion- {note.title}
                <p>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    className="mx-2"
                    variant="danger"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </p>
              </Accordion.Header>

              <Accordion.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0, 10)}
                    </cite>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </MainScreen>
  );
};

export default MyNotes;
