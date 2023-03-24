import {Server} from "./Server";
import {StaticServer} from "./StaticServer";

export function main() {
    console.log("Hello, World!");
    console.log(__dirname);
    const server: StaticServer = new StaticServer();

    server.listen(3000);
}