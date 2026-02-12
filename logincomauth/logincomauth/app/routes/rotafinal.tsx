/* 
import Final from "~/paginasdeloginoucadastro/paginafinal"
import { useNavigate } from "react-router-dom";


export default function RotaLogin() {

    const navigate = useNavigate();

    const Logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login")
  }



    return (
        < Final

        Logout={Logout}
        
        />
    )
}

*/