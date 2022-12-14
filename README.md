# Desafío 16

## Loggers, Gzip y análisis de performance.

### CON CONSOLE.LOG 

```console
┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 191 ms │ 206 ms │ 230 ms │ 241 ms │ 207.19 ms │ 12.71 ms │ 286 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg      │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Req/Sec   │ 413    │ 413    │ 488    │ 504    │ 479.6    │ 21.32   │ 413    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Bytes/Sec │ 224 kB │ 224 kB │ 265 kB │ 274 kB │ 260 kB   │ 11.6 kB │ 224 kB │
└───────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

10k requests in 20.05s, 5.21 MB read
```

El resultado de Artillery nos indica (ver archivo)

```console
http.response_time:
  min: ......................................................................... 4 
  max: ......................................................................... 120 
  median: ...................................................................... 62.2 
  p95: ......................................................................... 100.5 
  p99: ......................................................................... 102.5 
```

### SIN CONSOLE.LOG

```console
┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 33 ms  │ 34 ms  │ 45 ms  │ 51 ms  │ 34.81 ms  │ 3.63 ms  │ 97 ms  │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg      │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Req/Sec   │ 2004   │ 2004   │ 2889   │ 2939   │ 2830.25  │ 202.71  │ 2004   │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Bytes/Sec │ 1.09 MB│ 1.09 MB│ 1.57 MB│ 1.6 MB │ 1.54 MB  │ 111 kB  │ 1.09 MB│
└───────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

57k requests in 20.04s, 30.8 MB read
```

El resultado de Artillery nos indica (ver archivo)

```console
http.response_time:
  min: ......................................................................... 0 
  max: ......................................................................... 10 
  median: ...................................................................... 1 
  p95: ......................................................................... 2 
  p99: ......................................................................... 3 
```

Todas las pruebas realizadas nos indican que en el caso que logueamos por consola la respuesta antes de ser enviada el tiempo de respuesta es mayor y que en el mismo tiempo, se pueden manejar menos requests. La gran mejora en la carga de datos debe ser porque la ruta no muestra mucha informacion y no es tanta la carga para el sistema. La compresion de datos tampoco es sustancial debido a la poca informacion pero la carga de los mismo si (ver imagenes adjuntas).