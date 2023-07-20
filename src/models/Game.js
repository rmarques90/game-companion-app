export class Game {
    roomName;
    roomPassword;
    selectedGame;
    players;
    active;
    createdAt;
    updatedAt;
    ownerId;

    constructor({ roomName, roomPassword, selectedGame, players, active, createdAt, updatedAt, ownerId}) {
        this.roomName = roomName;
        this.roomPassword = roomPassword;
        this.selectedGame = selectedGame;
        this.players = players;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.ownerId = ownerId;
    }
}