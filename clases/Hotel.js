//ABUELO: EL ADMINISTRADOR (Hotel)
class Hotel {
  constructor(nombreDelHotel, direccionCiudad, habitacionesIniciales = []) {
    this.nombre = nombreDelHotel;
    this.direccion = direccionCiudad;
    
    const datosPersistidos = JSON.parse(localStorage.getItem("datos_hotel")) || { habitaciones: habitacionesIniciales, clientes: [], ultimaReserva: null };
    
    if (this.constructor.name === "Hotel") {
      this.habitaciones = datosPersistidos.habitaciones;
      this.clientes = datosPersistidos.clientes;
      this.ultimaReserva = datosPersistidos.ultimaReserva;
    } else {
      this.habitaciones = [];
      this.clientes = [];
      this.ultimaReserva = null;
    }
  }

  guardarEstado() {
    if (this.constructor.name === "Hotel") {
      const info = {
        nombre: this.nombre,
        direccion: this.direccion,
        habitaciones: this.habitaciones,
        clientes: this.clientes,
        ultimaReserva: this.ultimaReserva
      };
      localStorage.setItem("datos_hotel", JSON.stringify(info));
    }
  }

  // Metodo para agregar habitacion 
  agregarHabitacion(objetoHabitacion) {
    this.habitaciones.push(objetoHabitacion);
    this.guardarEstado(); 
    console.log("Habitación agregada con éxito.");
  }

  // Metodo para registrar al cliente 
  registrarCliente(objetoCliente) {
    this.clientes.push(objetoCliente);
    this.guardarEstado(); 
    console.log("Cliente registrado con éxito");
  }

  mostrarClientes() {
    console.log("CLIENTES EN MEMORIA:");
    this.clientes.forEach(c => console.log(`- ${c.nombre} (ID: ${c.identificacion})`));
  }

  mostrarHabitaciones() {
    console.log("HABITACIONES EN MEMORIA:");
    this.habitaciones.forEach(h => console.log(`- #${h.numero} [${h.tipo}] ($${h.precio})`));
  }
}
