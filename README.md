# Proyecto Angular con Material y NgRx

Este es un proyecto de Angular 17 que incluye Angular Material, NgRx para manejo de estado, y está configurado para Server-Side Rendering (SSR).

## Características

- **Angular 17.3.0** - Framework principal
- **Angular Material 17.3.10** - Componentes de UI
- **Angular CDK 17.3.10** - Component Development Kit
- **NgRx 17.2.0** - Manejo de estado (Store, Effects, Entity, Store DevTools)
- **JWT Decode** - Para manejo de tokens JWT
- **Express** - Para SSR
- **SCSS** - Preprocesador de CSS
- **TypeScript 5.4.2** - Lenguaje de programación

## Requisitos Previos

- Node.js 18+ 
- npm 9+

## Instalación

1. Clona el repositorio o navega al directorio del proyecto
2. Instala las dependencias:

```bash
npm install
```

## Desarrollo

### Servidor de desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`

### Build de producción

```bash
npm run build
```

### Build con SSR

```bash
npm run build
npm run serve:ssr:angular-project
```

### Testing

```bash
npm test
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── store/           # Configuración de NgRx
│   │   └── app.state.ts # Estado principal de la aplicación
│   ├── app.component.ts # Componente principal
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts    # Configuración de la aplicación
│   └── app.routes.ts    # Rutas de la aplicación
├── assets/              # Recursos estáticos
├── styles.scss          # Estilos globales con Angular Material
└── main.ts             # Punto de entrada
```

## Configuración de Angular Material

El proyecto incluye:
- Tema personalizado con paletas de colores
- Fuente Roboto de Google Fonts
- Iconos de Material Design
- Componentes: Toolbar, Card, Button, Icon, Expansion Panel

## Configuración de NgRx

El store está configurado con:
- Store principal
- Effects para side effects
- Store DevTools para debugging
- Entity para manejo de entidades

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run watch` - Construye en modo watch
- `npm test` - Ejecuta las pruebas
- `npm run serve:ssr:angular-project` - Sirve la aplicación con SSR

## Dependencias Principales

### Dependencies
- @angular/* - Framework Angular
- @angular/material - Componentes de Material Design
- @angular/cdk - Component Development Kit
- @ngrx/* - Librerías para manejo de estado
- jwt-decode - Decodificación de JWT
- express - Framework para SSR

### DevDependencies
- @angular-devkit/build-angular - Herramientas de build
- @angular/cli - CLI de Angular
- typescript - Compilador de TypeScript
- karma, jasmine - Testing framework

## Personalización

### Temas de Angular Material

Los temas se pueden personalizar editando `src/styles.scss`:

```scss
$primary-palette: mat.define-palette(mat.$indigo-palette);
$accent-palette: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$warn-palette: mat.define-palette(mat.$red-palette);
```

### Estado de NgRx

El estado se puede personalizar editando `src/app/store/app.state.ts`.

## Troubleshooting

### Problemas comunes

1. **Error de dependencias**: Ejecuta `npm install` nuevamente
2. **Error de build**: Verifica que TypeScript esté en la versión correcta
3. **Problemas de Material**: Asegúrate de que los módulos estén importados correctamente

### Logs

Para debugging, usa las DevTools de NgRx que están habilitadas en desarrollo.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT.
