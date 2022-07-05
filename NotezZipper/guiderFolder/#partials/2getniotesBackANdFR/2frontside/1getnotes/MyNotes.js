import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../MainScreen";
import { useDispatch, useSelector } from "react-redux";
import "./t.css";
import { listNotes } from "../../../actions/notesAction";
import Loading from "../../Loading";
import Error from "../../Error";
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //  dispatch(deleteNoteAction(id));
    }
  };
  useEffect(() => {
    dispatch(listNotes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <MainScreen title={`Welcome back `}>
      <Link to="/createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new button
        </Button>
      </Link>
      {error && <Error variant="danger"> {error}</Error>}
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />} */}
      {/* {errorDelete && <Error variant="danger">{errorDelete}</Error>} */}
      {notes?.map((note) => {
        return (
          <Accordion
            key={note._id}
            defaultActiveKey={note._id}
            style={{ marginBottom: "4rem" }}
          >
            <Accordion.Item eventKey="0">
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => deleteHandler()}
                >
                  Delete
                </Button>
              </div>
              <Accordion.Header as={Card.Text} variant="link" className="osps">
                Accordion- {note.title}
              </Accordion.Header>

              <Accordion.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {/* {note.createdAt.substring(0, 10)} */}
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
