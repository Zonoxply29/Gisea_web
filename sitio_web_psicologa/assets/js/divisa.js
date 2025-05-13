// Función para obtener el tipo de cambio
function obtenerTipoCambio(baseCurrency, targetCurrency, callback) {
    const xhr = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/1eab327ce5ff43aff90025da/latest/${baseCurrency}`
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const exchangeRate = response.rates[targetCurrency];
        callback(null, exchangeRate);
      } else if (xhr.readyState === 4) {
        callback(`Error: ${xhr.status}`, null);
      }
    };
    xhr.send();
  }

  // Función para obtener la divisa mediante la IP del usuario
function obtenerDivisaPorIP(callback) {
    const xhr = new XMLHttpRequest();
    const url = `https://ipapi.co/json/`;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const divisa = response.currency;
        console.log("Divisa detectada por IP:", divisa);
        callback(null, divisa);
      } else if (xhr.readyState === 4) {
        callback(`Error: ${xhr.status}`, null);
      }
    };
    xhr.send();
  }

  // Función para actualizar el precio en pantalla
function actualizarPrecioEnPantalla(elementId, precio, divisa) {
    const precioElemento = document.getElementById(elementId);
    precioElemento.textContent = `${precio} ${divisa}`;
  }

  // Función principal para iniciar la conversión
function iniciarConversionDePrecio(elementId, precioUSD) {
    obtenerDivisaPorIP(function (error, divisa) {
      if (error) {
        console.log(error);
        actualizarPrecioEnPantalla(elementId, precioUSD, 'USD');
      } else {
        obtenerTipoCambio('USD', divisa, function (error, tipoCambio) {
          if (error) {
            console.log('No se pudo obtener el tipo de cambio.');
            actualizarPrecioEnPantalla(elementId, precioUSD, 'USD');
          } else {
            const precioLocal = (precioUSD * tipoCambio).toFixed(2);
            actualizarPrecioEnPantalla(elementId, precioLocal, divisa);
          }
        });
      }
    });
  }

  // Ejecutar la conversión de precios para cada plan
document.addEventListener('DOMContentLoaded', function() {
    iniciarConversionDePrecio('precio-valoracion', parseFloat(document.getElementById('precio-valoracion').getAttribute('data-precio-usd')));
    iniciarConversionDePrecio('precio-flexible', parseFloat(document.getElementById('precio-flexible').getAttribute('data-precio-usd')));
    iniciarConversionDePrecio('precio-integral', parseFloat(document.getElementById('precio-integral').getAttribute('data-precio-usd')));
    iniciarConversionDePrecio('precio-transformacion', parseFloat(document.getElementById('precio-transformacion').getAttribute('data-precio-usd')));
  });

  //FINAL DE CODIGO