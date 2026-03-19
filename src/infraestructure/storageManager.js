export default class StorageManager {
  static KEY = "tasukuDB";

  static load() {
    const data = localStorage.getItem(this.KEY);

    if (!data) {
      const initialData = this.createInitialData();
      this.save(initialData);
      return initialData;
    }

    return JSON.parse(data);
  }

  static save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }

  static createInitialData() {
    const now = new Date().toISOString();

    const users = [
      {
        id: 1,
        name: "Iker",
        email: "iker@example.com",
        role: "admin",
        password: "123456",
        session: false,
        createdAt: now,
      },
      {
        id: 2,
        name: "Asier",
        email: "asier@example.com",
        role: "member",
        password: "123456",
        session: false,
        createdAt: now,
      },
    ];

    const spaces = [
      {
        id: 1,
        name: "Personal",
        key: "ABC123",
        ownerId: 1,
        members: [1],
        tasks: [1, 2, 3, 4], 
        taskTemplates: [
          {
            title: "Hacer la compra",
            difficulty: "easy",
          },
          {
            title: "Limpiar baño",
            difficulty: "medium",
          },
        ],
        session: false,
        weekStartDate: now,
        createdAt: now,
      },
      {
        id: 2,
        name: "Trabajo",
        key: "XYZ789",
        ownerId: 1,
        members: [1, 2],
        tasks: [5, 6, 7, 8, 9, 10],
        taskTemplates: [
          {
            title: "Daily meeting",
            difficulty: "easy",
          },
          {
            title: "Code review",
            difficulty: "medium",
          },
          {
            title: "Deploy producción",
            difficulty: "hard",
          },
        ],
        session: false,
        weekStartDate: now,
        createdAt: now,
      },
    ];

    const tasks = [
      {
        id: 1,
        title: "Comprar comida",
        description: "Ir al supermercado",
        status: "todo",
        priority: "medium",
        dueDate: "2026-03-20",
        createdAt: now,
        assignedTo: 1,
        spaceId: 1,
      },

      {
        id: 2,
        title: "Limpiar cocina",
        description: "Fregar platos",
        status: "todo",
        priority: "low",
        dueDate: "2026-03-18",
        createdAt: now,
        assignedTo: 2,
        spaceId: 1,
      },

      {
        id: 3,
        title: "Pagar facturas",
        description: "Luz e internet",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-03-19",
        createdAt: now,
        assignedTo: 1,
        spaceId: 1,
      },

      {
        id: 4,
        title: "Ordenar escritorio",
        description: "Organizar archivos",
        status: "todo",
        priority: "low",
        dueDate: "2026-03-24",
        createdAt: now,
        assignedTo: 1,
        spaceId: 1,
      },

      {
        id: 5,
        title: "Preparar reunión",
        description: "Agenda del equipo",
        status: "todo",
        priority: "high",
        dueDate: "2026-03-22",
        createdAt: now,
        assignedTo: 2,
        spaceId: 2,
      },

      {
        id: 6,
        title: "Enviar informe",
        description: "Informe mensual",
        status: "todo",
        priority: "medium",
        dueDate: "2026-03-23",
        createdAt: now,
        assignedTo: 2,
        spaceId: 2,
      },

      {
        id: 7,
        title: "Actualizar web",
        description: "Cambiar landing",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-03-25",
        createdAt: now,
        assignedTo: 1,
        spaceId: 2,
      },

      {
        id: 8,
        title: "Planificar sprint",
        description: "Planificación semanal",
        status: "todo",
        priority: "high",
        dueDate: "2026-03-21",
        createdAt: now,
        assignedTo: 1,
        spaceId: 2,
      },

      {
        id: 9,
        title: "Revisar emails",
        description: "Inbox pendiente",
        status: "done",
        priority: "low",
        dueDate: "2026-03-17",
        createdAt: now,
        assignedTo: 2,
        spaceId: 2,
      },

      {
        id: 10,
        title: "Preparar presentación",
        description: "Slides del proyecto",
        status: "todo",
        priority: "medium",
        dueDate: "2026-03-26",
        createdAt: now,
        assignedTo: 2,
        spaceId: 2,
      },
    ];

    return {
      users,
      spaces,
      tasks,
    };
  }

}
