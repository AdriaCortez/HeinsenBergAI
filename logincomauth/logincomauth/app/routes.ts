import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [route("/", "routes/home.tsx"),

    route("/enter", "routes/rotadeentrada.tsx"),
    route("/subscribe", "routes/rotadecadastro.tsx"),
    route("/login", "routes/rotadelogin.tsx"),
    route("/final", "routes/rotafinal.tsx"),
    route("/chat", "routes/voltarprochat.tsx"),
    route("/perfil", "routes/rotaperfil.tsx"),
    route("/trocarsenha", "routes/rotadetrocarsenha.tsx")

] satisfies RouteConfig;
