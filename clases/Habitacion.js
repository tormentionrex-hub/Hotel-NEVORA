// CLASE PADRE: Habitacion (Hereda del Hotel Administrador)
class HabitacionBase extends Hotel { //padre
  constructor(nombreDelHotel, ciudadUbicacion, numeroDelCuarto, tipoDeCuarto, precioPorNoche) {
    super(nombreDelHotel, ciudadUbicacion); // Llama al Abuelo
    this.numero = numeroDelCuarto;
    this.tipo = tipoDeCuarto;
    this.precio = precioPorNoche;
  }
}

// CLASES HIJAS: Economica, Grande y Suite (Heredan del Padre)
// Aqui se ve algo de polimorfismo

class Economica extends HabitacionBase {  //hijo llama a padre con super() y hereda todo
  constructor(nombreHotel, ciudadHotel, numeroHab) {
    super(nombreHotel, ciudadHotel, numeroHab, "Estandar", 450);
  }
}

class Suite extends HabitacionBase { //hijo llama a padre con super() y hereda todo
  constructor(nombreHotel, ciudadHotel, numeroHab) {
    super(nombreHotel, ciudadHotel, numeroHab, "suite", 2150);
  }
}

class Doble extends HabitacionBase { //hijo llama a padre con super() y hereda todo
  constructor(nombreHotel, ciudadHotel, numeroHab) {  
    super(nombreHotel, ciudadHotel, numeroHab, "doble", 720);
  }
}
