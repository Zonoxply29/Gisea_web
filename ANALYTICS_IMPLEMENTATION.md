# 📊 Google Analytics Implementation - Tracking de Idiomas

## 🎯 Objetivo
Implementar tracking avanzado de Google Analytics para medir interacciones del cambio de idioma y tiempo de sesión en inglés y japonés.

## 🚀 Funcionalidades Implementadas

### 1. **Tracking de Cambio de Idioma Mejorado**
- ✅ Evento `language_change` con idioma anterior y nuevo
- ✅ Tracking de transiciones específicas (SPA→ENG, ENG→JPN, etc.)
- ✅ Contador de cambios de idioma por sesión

### 2. **Tracking de Sesiones en Idiomas Extranjeros**
- ✅ Inicio automático de tracking al seleccionar ENG/JPN
- ✅ Cálculo preciso de duración de sesión
- ✅ Heartbeat cada 30 segundos para sesiones activas
- ✅ Tracking al cerrar página/cambiar idioma

### 3. **Tracking de Interacciones en Idiomas Extranjeros**
- ✅ Clics en tarjetas de servicios
- ✅ Navegación por menús y enlaces
- ✅ Scroll por página (cada 25%)
- ✅ Hover en elementos interactivos

### 4. **Milestones de Engagement**
- ✅ 30 segundos, 1 minuto, 2 minutos, 5 minutos, 10 minutos
- ✅ Solo se disparan una vez por sesión
- ✅ Incluyen contador de interacciones

## 📈 Eventos de Google Analytics Implementados

### `language_change`
```javascript
{
  'event_category': 'User_Interaction',
  'event_label': 'SPA_to_ENG',
  'previous_language': 'SPA',
  'new_language': 'ENG',
  'value': 1
}
```

### `foreign_language_session_start`
```javascript
{
  'event_category': 'Language_Session',
  'event_label': 'ENG',
  'language': 'ENG',
  'timestamp': '2025-07-30T...'
}
```

### `foreign_language_session_end`
```javascript
{
  'event_category': 'Language_Session',
  'event_label': 'ENG',
  'language': 'ENG',
  'session_duration_seconds': 125,
  'session_duration_minutes': 2,
  'total_interactions': 8
}
```

### `foreign_language_heartbeat`
```javascript
{
  'event_category': 'Language_Session',
  'event_label': 'ENG',
  'language': 'ENG',
  'session_duration_seconds': 90,
  'interactions_count': 5,
  'custom_parameter_1': 1.5  // minutos
}
```

### `foreign_language_interaction`
```javascript
{
  'event_category': 'Language_Engagement',
  'event_label': 'ENG_click',
  'interaction_type': 'click',
  'element_type': 'service_card',
  'language': 'ENG',
  'total_interactions': 3
}
```

### `foreign_language_engagement_milestone`
```javascript
{
  'event_category': 'Language_Engagement',
  'event_label': 'ENG_60s',
  'language': 'ENG',
  'milestone_seconds': 60,
  'total_interactions': 4
}
```

## 🔧 Configuración Técnica

### Variables Globales Añadidas
- `foreignLanguageStartTime`: Tiempo de inicio de sesión
- `foreignLanguageInteractions`: Contador de interacciones
- `window.foreignLanguageInterval`: Control de heartbeat

### Storage Utilizado
- **localStorage**: `selectedLanguage` - Idioma actual persistente
- **sessionStorage**: 
  - `${lang}_start_time` - Tiempo de inicio por idioma
  - `${lang}_milestone_${seconds}` - Milestones alcanzados

### Configuración GA4 Mejorada
- Custom parameters para duración y contadores
- Transport type beacon para reliability
- Mapping de dimensiones personalizadas

## 📊 Cómo Interpretar los Datos en GA4

### 1. **Análisis de Cambios de Idioma**
- Ve a **Eventos** → Busca `language_change`
- Filtra por `event_label` para ver transiciones específicas
- Analiza el parámetro `value` para contar total de cambios

### 2. **Tiempo en Idiomas Extranjeros**
- Ve a **Eventos** → Busca `foreign_language_session_end`
- Analiza `session_duration_minutes` para tiempo promedio
- Compara entre inglés y japonés

### 3. **Engagement en Idiomas Extranjeros**
- Ve a **Eventos** → Busca `foreign_language_interaction`
- Filtra por `language` (ENG/JPN)
- Analiza `interaction_type` para ver qué elementos son más populares

### 4. **Milestones de Tiempo**
- Ve a **Eventos** → Busca `foreign_language_engagement_milestone`
- Crea un embudo para ver qué porcentaje llega a cada milestone
- Compara retention entre idiomas

**Fecha de Implementación**: 30 de Julio, 2025  
**Versión**: 1.0  
**Estado**: ✅ Implementado y Funcional
