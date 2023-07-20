export class Game {
    id;
    roomName;
    roomPassword;
    selectedGame;
    players;
    active;
    createdAt;
    updatedAt;
    ownerId;
    scheduledFor;

    constructor({ id, roomName, roomPassword, selectedGame, players, active, createdAt, updatedAt, ownerId, scheduledFor }) {
        this.id = id;
        this.roomName = roomName;
        this.roomPassword = roomPassword;
        this.selectedGame = selectedGame;
        this.players = players;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.ownerId = ownerId;
        this.scheduledFor = scheduledFor;
    }
}