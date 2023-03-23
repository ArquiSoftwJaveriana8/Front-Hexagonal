En la terminal poner

### `npm start`

en dado caso de que les aparesca un error, poner 

### `npm install`
luego intentar de nuevo 
### `npm start`

Despues buscar la carpeta: node_modules/react-scripts/config/webpack.config.js y poner el siguiente codigo en resolve: {} // linea 307

resolve: {
  fallback: { 
    "timers": require.resolve("timers-browserify"), 
    "buffer": require.resolve("buffer/") 
  }
}

