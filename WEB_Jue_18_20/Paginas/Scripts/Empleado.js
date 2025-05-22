var URLBase = "http://itm20251jue1820.runasp.net/";
jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaEmpleados();
});
function LlenarTablaEmpleados() {
    let URL = URLBase + "api/Empleados/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblEmpleados");
}
async function EjecutarComando(Metodo, Funcion) {
    let URL = URLBase + "api/Empleados/" + Funcion;
    const empleado = new Empleado($("#txtDocumento").val(), $("#txtNombre").val(), $("#txtPrimerApellido").val(),
        $("#txtSegundoApellido").val(), $("#txtDireccion").val(), $("#txtTelefono").val(), $("#txtFechaNacimiento").val());
    const rpta = await EjecutarComandoServicioAuth(Metodo, URL, empleado);
    LlenarTablaEmpleados();
}
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    let URL = URLBase + "api/Empleados/ConsultarXDocumento?Documento=" + Documento;
    const empleado = await ConsultarServicioAuth(URL);
    if (empleado == null || empleado == undefined) {
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo realizar la consulta del empleado");
        $("#txtNombre").val("");
        $("#txtPrimerApellido").val("");
        $("#txtSegundoApellido").val("");
        $("#txtFechaNacimiento").val("");
        $("#txtTelefono").val("");
        $("#txtDireccion").val("");
    }
    else {
        $("#dvMensaje").removeClass("alert alert-danger");
        $("#dvMensaje").addClass("alert alert-success");
        $("#dvMensaje").html("");
        //Consultó el empleado
        $("#txtNombre").val(empleado.Nombre);
        $("#txtPrimerApellido").val(empleado.PrimerApellido);
        $("#txtSegundoApellido").val(empleado.SegundoApellido);
        $("#txtFechaNacimiento").val(empleado.FechaNacimiento.split('T')[0]);
        $("#txtTelefono").val(empleado.Telefono);
        $("#txtDireccion").val(empleado.Direccion);
    }
}
class Empleado {
    constructor(Documento, Nombre, PrimerApellido, SegundoApellido, Direccion, Telefono, FechaNacimiento) {
        this.Documento = Documento;
        this.Nombre = Nombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.Direccion = Direccion;
        this.Telefono = Telefono;
        this.FechaNacimiento = FechaNacimiento;
    }
}