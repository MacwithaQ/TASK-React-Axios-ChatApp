import { makeAutoObservable, observable, action } from "mobx";
import axios from "axios";

class RoomStore {
  rooms = [];

  fetchRooms = async () => {
    try {
      const chatRooms = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );

      this.rooms = chatRooms.data;
    } catch (error) {
      console.log(error);
    }
  };

  createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.rooms.push(newRoom);;
    } catch (error) {
      console.log(error);
    }
  };

  constructor() {
    makeAutoObservable(this);
  }
}

const roomStore = new RoomStore();
roomStore.fetchRooms();
export default roomStore;
