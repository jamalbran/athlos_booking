import { getHotelData } from "./getHotelData";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || "", true);
  const pathname: string = parsedUrl.pathname || "";

  if (pathname.startsWith("/search/")) {
    const searchString: string = decodeURIComponent(pathname.slice(8));

    try {
      const data = await getHotelData(searchString);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  } else if (pathname === "/hello") {
    res.end("world");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Invalid route");
  }
}).listen(8080, () => {
  console.log("Server is listening on port 8080");
});
