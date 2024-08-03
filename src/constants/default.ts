import { Estado, Usuario } from "../interfaces/types";

const DEFAULT_USER: Usuario = {
  id: 0,
  username: "Invitado",
  email: "",
  fechaRegistro: new Date().toISOString(),
  estado: Estado.ACTIVO,
};

export default DEFAULT_USER;