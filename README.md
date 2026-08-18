# ⚡ CHASKI

**El que trae la noticia primero.**

Radar de oportunidades de negocio en electricidad, energía solar, pozos a tierra y mantenimiento para el Callejón de Huaylas, Áncash.

RyC Contratistas Generales · YACUSOL — Ing. Rafael Zeña, Ingeniero Mecánico Electricista.

---

## Cómo publicarlo (una sola vez)

1. En GitHub, crea un repositorio **público** llamado `chaski`.
2. Entra al repositorio y haz clic en **Add file → Upload files**.
3. Arrastra **todos** los archivos de esta carpeta (no la carpeta, los archivos sueltos).
4. Abajo pulsa **Commit changes**.
5. Ve a **Settings → Pages**.
6. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)**. Guarda.
7. Espera 1–2 minutos. Tu dirección será:

```
https://TU-USUARIO.github.io/chaski/
```

## Cómo instalarlo en el celular

Abre esa dirección en el celular.

- **Android (Chrome):** menú ⋮ → *Instalar aplicación*.
- **iPhone (Safari):** botón compartir ⬆️ → *Añadir a pantalla de inicio*.

Queda el ícono en la pantalla de inicio y abre a pantalla completa, sin barra de navegador. Funciona también sin señal.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app |
| `manifest.json` | Nombre, ícono y colores al instalarla |
| `sw.js` | Hace que abra al instante y funcione sin internet |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Íconos de Android |
| `apple-touch-icon.png` | Ícono de iPhone |
| `favicon.png` | Ícono de la pestaña |

## Cómo actualizarlo

Edita `index.html` desde GitHub (lápiz ✏️) y confirma el cambio. Si cambias algo, sube también el número de versión en `sw.js` (`chaski-v1` → `chaski-v2`) para que los celulares tomen la versión nueva.
