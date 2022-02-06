import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const chatRooms = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(chatRooms.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchRooms();

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoom = async (updatedRoom) => {
    const roomId = updatedRoom.id;
    try {
      await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`,
        updatedRoom
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = async (roomId, msg) => {
    try {
      await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <center>
          <Routes>
            <Route
              path="/room/:roomSlug"
              element={<ChatRoom rooms={rooms} createMessage={createMessage} />}
            />
            <Route
              exact
              path="/"
              element={
                <ChatRoomsList
                  rooms={rooms}
                  createRoom={createRoom}
                  deleteRoom={deleteRoom}
                  updateRoom={updateRoom}
                />
              }
            />
          </Routes>
        </center>
      </div>
    </div>
  );
};

export default App;
