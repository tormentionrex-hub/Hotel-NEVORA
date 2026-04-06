export class Cliente {
  constructor(nombre, identificacion, contacto) {
    this.nombre = nombre;
    this.identificacion = identificacion;
    this.contacto = contacto;
    this.reservas = [];
  }

  agregarReserva(reserva) {
    this.reservas.push(reserva);
  }

  mostrarInfo() {
    console.log(`Cliente: ${this.nombre}`);
    console.log(`ID: ${this.identificacion}`);
    console.log(`Contacto: ${this.contacto}`);
    console.log(`Reservas activas: ${this.reservas.length}`);
  }
}
