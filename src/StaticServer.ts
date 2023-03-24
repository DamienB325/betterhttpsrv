import {Server} from "./Server";
import * as path from "path";
import * as net from "net";
import * as fs from "fs";
import * as mime from "mime";
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
            let tpath:string = "";
            let res:string = "";

            try {
                if(fpathsplit[fpathsplit.length].includes(".")) {
                    tpath = path.join(staticfloderpath, fpath);
                } else {
                    tpath = path.join(staticfloderpath, fpath+".html");
                }
                let bufout: Buffer = fs.readFileSync(tpath);
                let restxt:string = bufout.toString();
                res = `HTTP/1.1 200 OK
Content-Type: ${mime.getType(tpath)}
Content-Length: ${restxt.length}

${restxt}`;
            } catch(e) {
                let restxt:string = `<!DOCTYPE html>
<html>
    <head>
        <head>404 Not found</head>
    </head>
    <body>
        <h1>404</h1>
        <p>Error: ${e.toString()}</p>
    </body>
</html>`;
                res = `HTTP/1.1 404 NOT FOUND
Content-Type: text/html
Content-Length: ${restxt.length}

${restxt}
`;
            }
            srv.write(res)
        });
    }
}
