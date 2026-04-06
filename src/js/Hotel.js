export class Hotel {
  constructor(nombre, direccion) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.habitaciones = [];
  }

  agregarHabitacion(habitacion) {
    this.habitaciones.push(habitacion);
  }

  buscarHabitacion(numero) {
    return this.habitaciones.find(h => h.numero === numero) || null;
  }

  obtenerDisponibles() {
    return this.habitaciones.filter(h => !h.ocupada);
  }

  mostrarInfo() {
    console.log(`Hotel: ${this.nombre}`);
    console.log(`Dirección: ${this.direccion}`);
    console.log(`Total habitaciones: ${this.habitaciones.length}`);
    console.log(`Disponibles: ${this.obtenerDisponibles().length}`);
  }
}
