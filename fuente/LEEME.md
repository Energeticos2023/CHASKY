# Archivos fuente

`index.html` de la raíz se genera juntando estos tres:

- `plantilla.html` — estructura
- `estilo.css` — estilos
- `app.js` — lógica

Para regenerarlo:

```python
tpl=open('fuente/plantilla.html').read()
h=tpl.replace('/*__CSS__*/',open('fuente/estilo.css').read())
h=h.replace('/*__DATOS__*/',open('oportunidades.json').read().strip())
h=h.replace('/*__APP__*/',open('fuente/app.js').read())
open('index.html','w').write(h)
```

Si solo cambias la lista de oportunidades, no hace falta regenerar nada:
edita `oportunidades.json` y la app publicada lo lee sola.
