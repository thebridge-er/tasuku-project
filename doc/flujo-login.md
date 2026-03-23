flowchart TD

A[Usuario abre la aplicación] --> B[Pantalla de Login]

B --> C{¿Tiene cuenta?}

C -- Sí --> D[Introduce email y contraseña]
D --> E[Validar credenciales]

E --> F{¿Credenciales correctas?}

F -- Sí --> G[Crear sesión]
G --> H[Entrar al dashboard de la app]

F -- No --> I[Mostrar error]

C -- No --> J[Ir a pantalla de Registro]

J --> K[Usuario introduce datos]
K --> L[Validar datos de registro]

L --> M{¿Email ya existe?}

M -- Sí --> N[Mostrar error]

M -- No --> O[Crear nuevo usuario]
O --> P[Guardar usuario]
P --> Q[Volver a pantalla de Login]
Q --> D