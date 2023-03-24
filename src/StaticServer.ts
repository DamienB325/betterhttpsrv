import {Server} from "./Server";
import * as path from "path";
import * as net from "net";
import * as fs from "fs";

export class StaticServer extends Server {
    staticFolderPath:string = "none";
    constructor(floderpath: string = path.join(__dirname, "/public")) {
        super();
        this.staticFolderPath = floderpath;
    }
    override _addClassListener(srv: net.Socket) {
        let staticfloderpath = this.staticFolderPath;
        srv.once("data", function(request) {
            let fpath:string = request.toString('ascii').split(' ')[1];
            let fpathsplit = fpath.split("/");
            let bufout: Buffer = new Buffer("");
            let restxt:string = "";

            try {
                if(fpathsplit[fpathsplit.length].includes(".")) {
                    bufout = fs.readFileSync(path.join(staticfloderpath, fpath));
                } else {

                }
            } catch(e) {

            }
            srv.send(bufout.toString())
        });
    }
}
