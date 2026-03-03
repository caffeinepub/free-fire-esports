import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    age: bigint;
    name: string;
    role: string;
}
export interface backendInterface {
    getAllPlayers(): Promise<Array<Player>>;
    registerPlayer(name: string, age: bigint, role: string): Promise<void>;
}
