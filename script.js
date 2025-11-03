// verificacion de contraseña
  
  function verificarContraseña() {
    var password = document.getElementById("password").value;
    var imagen = document.querySelector('.img');
    if (password === "PQX") {
        document.getElementById("form").style.display = "block";
        document.getElementById("acceso").style.display = "none";
        imagen.style.display = 'none';
    } else {
        alert("Contraseña incorrecta");
    }
}


function cargarFechaActual() {
        var today = new Date();
        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var todayString = today.getFullYear() + "-" + month + "-" + day;
        document.getElementById("fecha").value = todayString;
      }
  
      window.onload = function() {
        cargarFechaActual();
      }


       document.getElementById("BTNR").addEventListener("click", function() { setTimeout(cargarFechaActual, 0); });



    function calcularEdad() {
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    document.getElementById('edad').value = edad;
  }






  // Objeto con los especialistas por especialidad
const especialistas = {
    "CIRUGIA GENERAL": [
      "DR. ANTONIO PAUSIN MUÑOZ",
      "DR. JUAN VAILATI LOPEZ",
      "DR. HENDER RINCON OLAVEZ",
      "DR. ALEXIS ORDAZ GONZALEZ",
      "DRA. FATIMA TINOCO HURTADO",
      "OTRO"
    ],


    "CIRUGIA INFANTIL": [
      "DRA. LORENA ANGEL GALLARDO",
      "DRA. MARIA JARA VALDIVIA",
      "OTRO"
    ],


    "GINECOLOGIA": [
      "DR. MIGUEL MOYA GONZALEZ",
      "DRA. JESSIE NEUMANN RUIZ",
      "DRA. ALIANY LEZAMA GUERRA",
      "DRA. AMANDA POBLETE REQUENA",
      "DRA. CELSA PEREZ SCOTT",
      "DR. MIGUEL CARRILLO AGUIRRE",
      "DRA. MARIA DURAN MONASTERIO",
      "OTRO"
    ],


    "MAXILOFACIAL": [
      "DR. JAVIER VENEGAS RIQUELME",
      "DR. HECTOR REYES RODRIGUEZ",
      "DR. SEBASTIAN GUTIERREZ ZUÑIGA",
      "DRA. LORENA SAAVEDRA BARRAZA",
      "OTRO"
    ],


    "OFTALMOLOGIA": [
      "DRA. MARIA SEQUERA LAMPER",
      "DRA. NAIRIM SANDOVAL NAVEDA",
      "OTRO"
    ],


    "OTORRINO": [
      "DR. ORLANDO DAWAHRE ACEVEDO",
      "DRA. MADELEIN MACHADO DELGADO",
      "OTRO"
    ],


    "TRAUMATOLOGIA": [
      "DR. JESUS SAYEGLE CHAMI",
      "DRA. DOUGMAI CAMACARO HERNANDEZ",
      "OTRO"
    ],


    "UROLOGIA": [
      "DR. LUIS HERNANDEZ VARGAS",
      "OTRO"
    ]
};


// Obtener referencias a los selects por sus IDs
const especialidadesSelect = document.getElementById('especialidades');
const especialistaSelect = document.getElementById('especialista');

// Evento de cambio en el select de especialidades
especialidadesSelect.addEventListener('change', function() {
    const selectedEspecialidad = this.value;
    
    // Limpiar el select de especialistas
    especialistaSelect.innerHTML = '<option value="">Seleccione un especialista</option>';
    
    // Si hay una especialidad seleccionada y tiene especialista
    if (selectedEspecialidad && especialistas[selectedEspecialidad]) {
        especialistas[selectedEspecialidad].forEach(especialista => {
            const option = document.createElement('option');
            option.value = especialista;
            option.textContent = especialista;
            especialistaSelect.appendChild(option);
        });
    }
});





// BOTÓN PARA ENVIAR Y GUARDAR LOS DATOS 
document.getElementById('BTN').addEventListener('click', function(e) {
  e.preventDefault();
  
  abrirModalEnviando();

  const form = document.getElementById('form');
  const formData = new FormData(form);



// === FÓRMULA UNIVERSAL DIFERENCIA DE FECHAS EN DIAS (FUNCIONA EN CUALQUIER IDIOMA) ===
const formulaDinamica = '=IF(ISBLANK(INDIRECT("D"&ROW())); 0; TODAY() - INDIRECT("D"&ROW()))';
formData.set('tEspera', formulaDinamica);


// EDAD EN AÑOS (COL G) → CON INT (elimina decimales)
const formulaEdad = '=IF(ISBLANK(INDIRECT("G" & ROW())); 0; INT((TODAY() - INDIRECT("G" & ROW())) / 365))';
formData.set('edad', formulaEdad);


// === FÓRMULA UNIVERSAL DIFERENCIA DE FECHAS EN DIAS ESPERA PROGRAMABLE 
const formulaEspProg = '=IF(ISBLANK(INDIRECT("AG"&ROW())); 0; TODAY() - INDIRECT("AG"&ROW()))';
formData.set('espProg', formulaEspProg);

// === NÚMERO DE REGISTRO AUTOMÁTICO (COL A, desde fila 3) ===
const formulaRegistro = '=ROW() - 2';
formData.set('numRegistro', formulaRegistro);


  // === CONVERTIR FECHAS A dd/mm/aaaa ===
  const fechaInput = document.getElementById('fecha');
  const fechaNacInput = document.getElementById('fechaNacimiento');
  const fechaEpaInput = document.getElementById('fechaEpa');

  if (fechaInput && fechaInput.value) {
    formData.set('fecha', convertirA_DDMMAAAA(fechaInput.value));
  }

  if (fechaNacInput && fechaNacInput.value) {
    formData.set('fechaNacimiento', convertirA_DDMMAAAA(fechaNacInput.value));
  }

  if (fechaEpaInput && fechaEpaInput.value) {
    formData.set('fechaEpa', convertirA_DDMMAAAA(fechaEpaInput.value));
  }






  // === ENVIAR CON FETCH ===
  fetch(form.action, {  // Usa form.action → más seguro
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    alert('¡Registro exitoso!');
    form.reset();
    cargarFechaActual();
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error de conexión. Intenta de nuevo.');
  })
  .finally(() => {
    cerrarModalEnviando();
  });
});

// === FUNCIÓN PARA CONVERTIR YYYY-MM-DD → DD/MM/AAAA ===
function convertirA_DDMMAAAA(yyyy_mm_dd) {
  const [year, month, day] = yyyy_mm_dd.split('-');
  return `${day}/${month}/${year}`;
}





// Obtener los elementos del modal
var modalEnviando = document.getElementById('modal-enviando');

var btnGuardar = document.getElementById('BTN');

// Función para abrir el modal de enviando datos
function abrirModalEnviando() {
  modalEnviando.style.display = 'flex';
}

// Función para cerrar el modal de enviando datos
function cerrarModalEnviando() {
  modalEnviando.style.display = 'none';
}
