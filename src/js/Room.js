export class Habitacion {
  constructor(numero, tipo, precio) {
    this.numero = numero;
    this.tipo = tipo;
    this.precio = precio;
    this.ocupada = false;
  }

  ocupar() {
    if (this.ocupada) {
      console.log(`Habitación ${this.numero} ya está ocupada.`);
      return false;
    }
    this.ocupada = true;
    console.log(`Habitación ${this.numero} ahora está ocupada.`);
    return true;
  }

  liberar() {
    if (!this.ocupada) {
      console.log(`Habitación ${this.numero} ya está libre.`);
      return false;
    }
    this.ocupada = false;
    console.log(`Habitación ${this.numero} ahora está libre.`);
    return true;
  }

  mostrarInfo() {
    console.log(`Habitación ${this.numero} | Tipo: ${this.tipo} | Precio: $${this.precio} | Estado: ${this.ocupada ? 'Ocupada' : 'Disponible'}`);
  }
}
