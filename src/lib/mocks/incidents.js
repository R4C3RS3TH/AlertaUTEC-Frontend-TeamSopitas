// Simula la lista de incidentes que vendría de DynamoDB
export const mockIncidents = [
    {
        id: 'inc-001',
        tipo: 'Infraestructura',
        ubicacion: 'Pabellón B, Laboratorio B302',
        descripcion: 'El proyector no enciende y la luz parpadea.',
        urgencia: 'alta',
        estado: 'pendiente',
        creadoPor: 'Alex Torres',
        fecha: '2025-11-15T14:30:00Z'
    },
    {
        id: 'inc-002',
        tipo: 'Servicios',
        ubicacion: 'Comedor Central (Piso 3)',
        descripcion: 'No hay servicio de agua en los baños del comedor.',
        urgencia: 'media',
        estado: 'en_atencion',
        creadoPor: 'Maria Fernandez',
        fecha: '2025-11-15T12:15:00Z'
    },
    {
        id: 'inc-003',
        tipo: 'Limpieza',
        ubicacion: 'Biblioteca (Piso 4)',
        descripcion: 'Papelera reventando, necesita limpieza urgente.',
        urgencia: 'baja',
        estado: 'resuelto',
        creadoPor: 'Carlos Luna',
        fecha: '2025-11-14T18:00:00Z'
    }
];