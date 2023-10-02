document.addEventListener
(
    "DOMContentLoaded",
    function()
    {
        const calcular = document.querySelector("#calcular");
        
        calcular.addEventListener
        (
            "click",
            function()
            {
                //console.log("Dentro de la funcion principal.");
                var porcentaje=0;
                const propinaMinima=0.50;
                var propina=0;
                var validacionNumerosComensales=false;
                var campoCantidadDeComensalesPasoTodasLasValidaciones=false;
                const cantidadDeComensales = document.querySelector("#cantidadDeComensales");
                validacionNumerosComensales=verificarQueElCampoSoloContengaNumeros(validacionNumerosComensales,cantidadDeComensales);


                var validacionTotalGastado=false;
                var campoTotalGastadoPasoTodasLasValidaciones=false;
                const totalGastado = document.querySelector("#totalGastado");
                validacionTotalGastado=verificarQueElCampoSoloContengaNumerosDecimales(validacionTotalGastado,totalGastado);
                

                var validacionCalificacionDelServicio=false;
                var campoCalificacionDelServicioPasoTodasLasValidaciones=false;
                const calificacionDelServicio=document.querySelector("#calificacionDelServicio");
                validacionCalificacionDelServicio=verificarQueElCampoNoEsteVacio(validacionCalificacionDelServicio,calificacionDelServicio);
                porcentaje=convertirCalificacionAPorcentaje(porcentaje,calificacionDelServicio);


                if(validacionNumerosComensales)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionCantidadDeComensales");
                    mensajeError.textContent = "";
                    campoCantidadDeComensalesPasoTodasLasValidaciones=true;
                }

                if(validacionTotalGastado)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionTotalGastado");
                    mensajeError.textContent = "";
                    campoTotalGastadoPasoTodasLasValidaciones=true;
                }

                if(validacionCalificacionDelServicio)
                {
                    const mensajeError = document.querySelector("#mensajeValidacionCalificacionDelServicio");
                    mensajeError.textContent = "";
                    campoCalificacionDelServicioPasoTodasLasValidaciones=true;
                }



                if(campoCantidadDeComensalesPasoTodasLasValidaciones&&campoTotalGastadoPasoTodasLasValidaciones&&campoCalificacionDelServicioPasoTodasLasValidaciones)
                {
                    propina=calcularPropinaJusta(totalGastado,porcentaje,cantidadDeComensales,propina,propinaMinima);
                    propina=truncarDecimal(propina);
                    var confirmacion = window.confirm
                    (
                        "Los datos que has introducido son: \n► Cantidad de comensales: "+cantidadDeComensales.value+"\n► Total: "+totalGastado.value+" €"+"\n► Calificacion del servicio: "+calificacionDelServicio.value+"\n¿Deseas calcular propina?"
                    );

                    //Mensaje de confirmacion
                    if (confirmacion)
                    {
                        const pantallaResultado = document.querySelector("#pantallaResultado");
                        pantallaResultado.value=propina+" € cada uno.";
                        window.alert("Propina justa calculada exitosamente.");
                        console.log(pantallaResultado.value=propina+" € cada uno.");
                        event.preventDefault();
                    }
                    else
                    {
                        event.preventDefault();
                    }
                }
                /*console.log("El valor es: "+cantidadDeComensales.value);
                event.preventDefault();*/
            }
        );

        function verificarQueElCampoSoloContengaNumeros(validacionNumerosComensales,elementoInput)
        {
            //console.log("Dentro de la funcion verificarQueElCampoSoloContengaNumeros.");
            if(elementoInput.value==="")
            {
                elementoInput.value=1;
            }
            if (!elementoInput.value.match(/^[0-9]+$/))
            {
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "Este campo solo puede contener numeros naturales.";
                event.preventDefault();
            }
            else
            {
                validacionNumerosComensales=true;
            }
            return validacionNumerosComensales; 
        }

        function verificarQueElCampoSoloContengaNumerosDecimales(validacionTotalGastado,elementoInput)
        {
            //console.log("Dentro de la funcion verificarQueElCampoSoloContengaNumerosDecimales.");
            if (!totalGastado.value.match(/^[0-9]+(\.[0-9]{1,2})?$/))
            {
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "Este campo solo puede contener numeros decimales.";
                event.preventDefault();
            }
            else
            {    
                validacionTotalGastado=true;
            }
            return validacionTotalGastado;
        }

        function verificarQueElCampoNoEsteVacio(validacionCalificacionDelServicio,elementoInput)
        {
            if (elementoInput.value === "vacio")
            {
                const mensajeError = document.querySelector("#mensajeValidacion"+elementoInput.name);
                mensajeError.style.color = "red";
                mensajeError.textContent = "Esta opcion no puede quedar vacia.";
                event.preventDefault();
            }
            else
            {
                validacionCalificacionDelServicio=true;
            }
            return validacionCalificacionDelServicio;
        }

        function convertirCalificacionAPorcentaje(porcentaje,calificacionDelServicio)
        {
            if(calificacionDelServicio.value==="genial")
            {
                porcentaje=10;
            }
            else if(calificacionDelServicio.value==="aceptable")
            {
                porcentaje=5;
            }
            else if(calificacionDelServicio.value==="horrible")
            {
                porcentaje=0;
            }
            console.log("El porcentaje es: "+porcentaje);
            return porcentaje;
        }

        function calcularPropinaJusta(totalGastado,porcentaje,cantidadDeComensales,propina,propinaMinima)
        {
            console.log("La propina minima es: "+propinaMinima);
            console.log("El resultado es: "+((totalGastado.value*porcentaje)/100)/cantidadDeComensales.value);
            propina=((totalGastado.value*porcentaje)/100)/cantidadDeComensales.value;
            if(propina<propinaMinima)
            {
                console.log("La propina minima es: "+propinaMinima);
                propina=propinaMinima;
            }

            return propina;
        }

        function truncarDecimal(propina)
        {
            const parteDecimal = propina.toFixed(2);
          
            return parseFloat(parteDecimal);
        }
    }
);