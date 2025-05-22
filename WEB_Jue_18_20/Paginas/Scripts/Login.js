var URLBase = "http://itm20251jue1820.runasp.net/";
async function Ingresar() {
    //var define variables de alcance global para la página
    //let define variables locales de la función
    //const para definir constantes u objetos
    let URL = URLBase + "api/Login/Ingresar";
    const login = new Login($("#txtUsuario").val(), $("#txtClave").val());
    const Respuesta = await EjecutarComandoServicioRpta("POST", URL, login);
    if (Respuesta == null || Respuesta == undefined) {
        document.cookie = "token=0;path=/";
        //Hubo un error al procesar el comando
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo conectar con el servicio");
    }
    else {
        if (Respuesta[0].Autenticado == false) {
            //No se pudo autenticar, debe mostrar el error
            $("#dvMensaje").removeClass("alert alert-success");
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(Respuesta[0].Mensaje);
        }
        else {
            //Hubo respuesta, se lee el token y se navega a la página indicada en el servicio
            const extdays = 0.1;
            const d = new Date();
            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
            let expires = ";expires=" + d.toUTCString();
            document.cookie = "token=" + Respuesta[0].Token + expires + ";path=/";
            $("#dvMensaje").removeClass("alert alert-danger");
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(Respuesta[0].Mensaje);
            document.cookie = "Perfil=" + Respuesta[0].Perfil;
            document.cookie = "Usuario=" + Respuesta[0].Usuario;
            window.location.href = Respuesta[0].PaginaInicio;
        }
    }
}
class Login {
    constructor(Usuario, Clave) {
        this.Usuario = Usuario;
        this.Clave = Clave;
    }
}