import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),

    route("portifolio/:id?", "routes/rotaportifolio.tsx"), //se tiver id, edita
    route("/trabalhos", "routes/rotatrabalho.tsx"),
    route("/chat", "routes/rotachat.tsx"),
    route("/perfil", "routes/redirectprofile.tsx"),
    route("/enter", "routes/redirect.tsx"),
    route("/trocarsenha", "routes/redirectsendpassword.tsx")

    ] satisfies RouteConfig;

//Arquivo padrão de definição de rota
