var URLBase = "http://itm20251jue1820.runasp.net/";
jQuery(function () {
    let URL = URLBase + "api/TipoTelefonos/LlenarCombo";
    LlenarTablaClientes();
    LlenarComboXServiciosAuth(URL, "#cboTipoTelefono");
});
function LlenarTablaClientes() {
    let URL = URLBase + "api/Clientes/ClientesConTelefonos";
    //let URL = URLBase + "api/Clientes/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblClientes");
}
function LlenarTablaTelefonos() {
    let Documento = $("#txtDocumento").val();
    let URL = URLBase + "api/Telefonos/ListadoTelefonosXCliente?Documento=" + Documento;
    $("#modTelefonosLabel").html("GESTIÓN DE TELÉFONOS - CLIENTE: " + $("#txtNombre").val() + " " + $("#txtPrimerApellido").val() + " " + $("#txtSegundoApellido").val());
    LlenarTablaXServiciosAuth(URL, "#tblTelefonos");
}
function Editar(Documento, Nombre, PrimerApellido, SeguntodApellido, Direccion, Email, FechaNacimiento) {
    $("#txtDocumento").val(Documento);
    $("#txtNombre").val(Nombre);
    $("#txtPrimerApellido").val(PrimerApellido);
    $("#txtSegundoApellido").val(SeguntodApellido);
    $("#txtDireccion").val(Direccion);
    $("#txtEmail").val(Email);
    $("#txtFechaNacimiento").val(FechaNacimiento);
}
function EditarTelefono(Codigo, idTipoTelefono, NumeroTelefono) {
    $("#txtCodigo").val(Codigo);
    $("#cboTipoTelefono").val(idTipoTelefono);
    $("#txtNumero").val(NumeroTelefono);
}
async function EjecutarComando(Metodo, Funcion) {
    event.preventDefault();
    let URL = URLBase + "/api/Telefonos/" + Funcion;
    const telefono = new Telefono($("#txtCodigo").val(), $("#txtNumero").val(), $("#txtDocumento").val(), $("#cboTipoTelefono").val());
    await EjecutarComandoServicioAuth(Metodo, URL, telefono);
    LlenarTablaTelefonos();
}
class Telefono {
    constructor(Codigo, Numero, Documento, CodigoTipoTelefono) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.Documento = Documento;
        this.CodigoTipoTelefono = CodigoTipoTelefono;
    }
}