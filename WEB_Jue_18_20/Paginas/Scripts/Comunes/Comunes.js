function FormatoMiles(Valor) {
    return "$ " + Intl.NumberFormat('es-CO').format(Valor);
}
function FechaHoy() {
    let now = new Date();
    return now.toISOString().split('T')[0];
}