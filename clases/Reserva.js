// CLASE RESERVA
// Une a un Cliente con una habitacion (Suite, Doble o Economica).
// Esta clase NO hereda nada directamente solo recibe objetos ya creados.
class Reserva {
  constructor(objetoClienteReal, objetoHijoReal) {
    this.cliente = objetoClienteReal;
    this.habitacion = objetoHijoReal; // Instancia hija: accede a atributos de HabitacionBase y Hotel via cadena
  }

  confirmarReserva() {
    console.log("INSTANCIA RESERVA:");
    console.log("Huésped: " + this.cliente.nombre);

    // Acceso a datos heredados (Atributos de Hotel)
    console.log("Ubicación: " + this.habitacion.direccion);
    console.log("Hotel: " + this.habitacion.nombre);

    // Atributos de Habitación
    console.log("Habitación seleccionada: " + this.habitacion.tipo);
    console.log("Precio por instancia: $" + this.habitacion.precio);
  }
}
