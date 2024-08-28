# Mantis Manager

**Mantis Manager** es un software de gestión de mantenimiento diseñado para mejorar la organización y eficiencia en la gestión de mantenimientos y reparaciones de máquinas en una empresa. Este software proporciona una plataforma centralizada para reportar, gestionar, y hacer seguimiento de los trabajos de mantenimiento, tanto preventivos como correctivos.

## Descripción del Problema

La falta de un sistema estructurado y centralizado para la gestión de mantenimientos y reparaciones de máquinas puede llevar a tiempos de respuesta prolongados y periodos de inactividad no planificados. Esto no solo afecta la producción, sino que también dificulta el aprovechamiento óptimo de los recursos. **Mantis Manager** está diseñado para resolver estos problemas al proporcionar una solución integral para la gestión de mantenimientos.

## Funcionalidades del Sistema

### Módulos Principales

1. **Módulo de Reporte de Daños y Mantenimientos:**
   - Permite a los usuarios generar tickets de mantenimiento de manera rápida y sencilla. Cada ticket incluye detalles como la máquina afectada, una descripción del problema y la urgencia del mantenimiento.

2. **Módulo de Gestión de Tickets:**
   - Los técnicos pueden ver una lista de todos los tickets abiertos, filtrarlos por urgencia, tipo de problema o máquina afectada, y asignarse los tickets que correspondan a su especialidad. Esto reduce el tiempo de respuesta y asegura que los problemas se aborden de manera eficiente.

3. **Módulo de Historial de Mantenimientos:**
   - Proporciona un registro centralizado de todos los mantenimientos realizados, tanto preventivos como correctivos. Este historial incluye detalles como la intervención realizada, el técnico responsable, fechas de inicio y fin, y los resultados obtenidos.

4. **Módulo de Planificación de Mantenimiento Preventivo:**
   - Permite programar mantenimientos preventivos basados en el tiempo de uso de las máquinas o en intervalos de tiempo definidos, reduciendo la posibilidad de fallos inesperados.

5. **Módulo de Gestión de Inventario de Repuestos:**
   - Lleva un control del inventario de repuestos y materiales necesarios para el mantenimiento. Los usuarios pueden verificar la disponibilidad de piezas antes de asignar una orden de trabajo y recibir alertas cuando el inventario está bajo.

6. **Módulo de Notificaciones y Alertas:**
   - Envía notificaciones automáticas a técnicos y supervisores sobre la asignación de nuevos tickets, vencimientos de mantenimiento preventivo, y otros eventos críticos.

7. **Módulo de Reportes y Análisis:**
   - Genera reportes detallados sobre el rendimiento del mantenimiento, los tiempos de inactividad, los costos de reparaciones, y otros indicadores clave de rendimiento.

8. **Módulo de Gestión de Usuarios y Roles:**
   - Administra los permisos de acceso y roles de los diferentes tipos de usuarios, garantizando que cada uno solo tenga acceso a la información y funciones relevantes.

9. **Módulo de Integración con IoT:**
   - Permite la integración con dispositivos IoT para monitorear el estado de las máquinas en tiempo real, generando automáticamente tickets cuando se detectan anomalías o condiciones de operación no óptimas.

## Requisitos No Funcionales

- **Escalabilidad:** Capacidad de manejar un número creciente de usuarios y tickets a medida que la empresa expanda sus operaciones.
- **Usabilidad:** Interfaz intuitiva que permite a los usuarios generar y gestionar tickets sin necesidad de entrenamiento extenso.
- **Seguridad:** Protección de datos contra accesos no autorizados, garantizando la confidencialidad e integridad de la información.

## Flujo de Interacción


## Escenario de Uso

Un operador de una máquina reporta un fallo crítico a través del sistema, generando un ticket que detalla el problema. Un técnico asignado recibe una notificación, se encarga de la reparación en menos de una hora, y documenta la intervención. La máquina vuelve a estar operativa, minimizando el impacto en la producción.

## Impacto Esperado

La implementación de **Mantis Manager** reducirá significativamente el tiempo de inactividad de las máquinas, mejorará la eficiencia del área de mantenimiento y aumentará la productividad general de la empresa. Además, proporcionará una mayor organización, transparencia, y capacidad de toma de decisiones informadas basadas en datos históricos de mantenimiento.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/mantis-manager.git

