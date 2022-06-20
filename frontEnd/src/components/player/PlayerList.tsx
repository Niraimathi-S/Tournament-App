import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { MdDeleteOutline, MdCreate } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { player } from "../../types/player";
import Header from "../header/Header";
import { AppDispatch } from "../store/store";
import "./Player.css";
import PlayerForm from "./PlayerForm";
import { getPlayers, removePlayer } from "./playerSlice";

interface IPlayerState {
  players: player[];
}

let initialValue: player = {
  _id: "",
  firstName: "",
  lastName: "",
  age: 0,
  email: "",
  gender: "",
  category: "",
};

function PlayerList(props: {}) {
  const players = useSelector((state: IPlayerState) => state.players);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [player, setPlayer] = useState(initialValue);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPlayers());
  }, [dispatch]);

  return (
    <div>
      <Header />
      {isFormOpened ? (
        <PlayerForm setIsFormOpened={setIsFormOpened} player={player} />
      ) : (
        <div className="create-player-btn">
          <Button
            variant="outline-primary"
            onClick={() => {
              setPlayer(initialValue);
              setIsFormOpened(true);
            }}
          >
            Create New Player
          </Button>
        </div>
      )}
      <div className="container">
        <h3>Players List</h3>
        <Table striped bordered hover size="lg">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email ID</th>
              <th>Age</th>
              <th>Category</th>
              <th>Gender</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {players?.map((player: player, index: number) => {
              return (
                <tr key={index}>
                  <td>{player.firstName}</td>
                  <td>{player.lastName}</td>
                  <td>{player.email}</td>
                  <td>{player.age}</td>
                  <td>{player.category}</td>
                  <td>{player.gender}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={(e) => {
                        if (
                          window.confirm(
                            "This user will be deleted. Are you sure?"
                          )
                        ) {
                          dispatch(removePlayer(player._id));
                        }
                      }}
                    >
                      <MdDeleteOutline className="icon" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setIsFormOpened(true);
                        setPlayer(player);
                        console.log("player", player);
                      }}
                      variant="outline-primary"
                    >
                      <MdCreate className="icon" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PlayerList;
