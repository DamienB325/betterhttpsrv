import * as net from "net";
export class Server {
    srv: any = null;
    constructor() {
        this.srv = net.createServer(this.addClassListener);
        // this.addClassListener(this.srv);
    }
    addClassListener(srv: net.Socket) {
        srv.once("data", function(request) {
           let restxt = `<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to BetterHTTPSrv</title>
    </head>
    <body>
        <h1>Hello, World!</h1>
        <p>This is the default page for <a href="https://github.com/DamienB325/betterhttpsrv">BetterHTTPSrv</a></p>
    </body>
</html>`;

           let res = `HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: ${restxt.length}

${restxt}`;
           srv.write(res);
        });
    }
    listen(port: number) {
        this.srv.listen(port);
    }
}