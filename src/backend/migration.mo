import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  // Original player record type
  type OldPlayer = {
    name : Text;
    age : Nat;
    role : {
      #rusher;
      #sniper;
      #support;
      #igl;
    };
    registrationTime : Time.Time;
  };

  // Original actor state
  type OldActor = {
    players : [OldPlayer];
  };

  // New player record type
  type NewPlayer = {
    name : Text;
    age : Nat;
    role : Text;
  };

  // New actor state type
  type NewActor = {
    players : Map.Map<Nat, NewPlayer>;
    nextPlayerId : Nat;
  };

  // Helper function to convert roles to Text
  func getRole(role : {
    #rusher;
    #sniper;
    #support;
    #igl;
  }) : Text {
    switch (role) {
      case (#rusher) { "rusher" };
      case (#sniper) { "sniper" };
      case (#support) { "support" };
      case (#igl) { "igl" };
    };
  };

  // Migration function
  public func run(old : OldActor) : NewActor {
    let map = Map.fromIter<Nat, NewPlayer>(
      old.players.values().enumerate().map(
        func((i, p)) {
          (
            i,
            {
              p with
              role = getRole(p.role);
            },
          );
        }
      )
    );
    {
      players = map;
      nextPlayerId = old.players.size();
    };
  };
};
