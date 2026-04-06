export class Reserva {
  constructor(cliente, habitacion, fechaEntrada, fechaSalida) {
    this.cliente = cliente;
    this.habitacion = habitacion;
    this.fechaEntrada = new Date(fechaEntrada);
    this.fechaSalida = new Date(fechaSalida);
    this.cancelada = false;
    this.habitacion.ocupar();
    this.cliente.agregarReserva(this);
  }

  cancelar() {
    if (this.cancelada) {
      console.log('Esta reserva ya fue cancelada.');
      return false;
    }
    this.cancelada = true;
    this.habitacion.liberar();
    console.log(`Reserva de ${this.cliente.nombre} cancelada.`);
    return true;
  }

  mostrarInfo() {
    const entrada = this.fechaEntrada.toLocaleDateString('es-ES');
    const salida = this.fechaSalida.toLocaleDateString('es-ES');
    console.log(`Reserva | Cliente: ${this.cliente.nombre} | Habitación: ${this.habitacion.numero} | ${entrada} → ${salida} | Estado: ${this.cancelada ? 'Cancelada' : 'Activa'}`);
  }
}
