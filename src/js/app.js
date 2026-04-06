import { Hotel } from './Hotel.js';
import { Habitacion } from './Room.js';
import { Cliente } from './Client.js';
import { Reserva } from './Booking.js';

// --- Instancias de prueba ---

const hotel = new Hotel('Hotel Aurélyn', 'Barrio Los Ángeles, Heredia Centro, Costa Rica');

const hab101 = new Habitacion(101, 'Santuario Estándar', 450);
const hab202 = new Habitacion(202, 'Suite Deluxe', 750);
const hab301 = new Habitacion(301, 'Suite Presidencial', 2200);

hotel.agregarHabitacion(hab101);
hotel.agregarHabitacion(hab202);
hotel.agregarHabitacion(hab301);

const cliente1 = new Cliente('María Solís', 'CR-00123', 'maria@ejemplo.com');
const cliente2 = new Cliente('Carlos Vargas', 'CR-00456', 'carlos@ejemplo.com');

const reserva1 = new Reserva(cliente1, hab101, '2024-12-01', '2024-12-07');
const reserva2 = new Reserva(cliente2, hab202, '2024-12-03', '2024-12-10');

// --- Mostrar información en consola ---
hotel.mostrarInfo();
console.log('---');
hab101.mostrarInfo();
hab202.mostrarInfo();
hab301.mostrarInfo();
console.log('---');
cliente1.mostrarInfo();
cliente2.mostrarInfo();
console.log('---');
reserva1.mostrarInfo();
reserva2.mostrarInfo();
