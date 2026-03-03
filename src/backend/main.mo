import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Player = {
    name : Text;
    age : Nat;
    role : Text;
  };

  let players = Map.empty<Nat, Player>();
  var nextPlayerId = 0;

  public shared ({ caller }) func registerPlayer(name : Text, age : Nat, role : Text) : async () {
    let newPlayer : Player = {
      name;
      age;
      role;
    };

    players.add(nextPlayerId, newPlayer);
    nextPlayerId += 1;
  };

  public query ({ caller }) func getAllPlayers() : async [Player] {
    players.values().toArray();
  };
};
