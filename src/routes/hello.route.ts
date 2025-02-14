import { Hono } from "hono";

export const helloRouter = new Hono();

// Define un endpoint GET en la ruta raíz de este router
helloRouter.get("/", (c) => c.text("hola"));

export default helloRouter;
