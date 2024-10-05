class Tarea {
  constructor(titulo, estado = false) {
    this.titulo = titulo;
    this.estado = estado;
  }
}

class GestorDeTareas {
  constructor() {
    this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    this.mostrarTareas();
  }

  agregarTarea(titulo) {
    const nuevaTarea = new Tarea(titulo);
    this.tareas.push(nuevaTarea);
    this.actualizarLocalStorage();
    this.mostrarTareas();
  }

  eliminarTarea(index) {
    this.tareas.splice(index, 1);
    this.actualizarLocalStorage();
    this.mostrarTareas();
  }

  cambiarEstadoTarea(index) {
    this.tareas[index].estado = !this.tareas[index].estado;
    this.actualizarLocalStorage();
    this.mostrarTareas();
  }

  actualizarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  mostrarTareas() {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';

    this.tareas.forEach((tarea, index) => {
      const li = document.createElement('li');
      li.classList.add('tarea');

      li.innerHTML = `            
            <input type='checkbox' ${
              tarea.estado ? 'checked' : ''
            }  class='check' data-index="${index}">
            <span>${tarea.titulo}</span>           
            <button class='btn-eliminar' data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
          `;

      listaTareas.appendChild(li);
    });

    // Escuchador para el checkbox
    const checkbox = document.querySelectorAll('.check');
    checkbox.forEach((check) => {
      check.addEventListener('change', (e) => {
        const index = e.target.getAttribute('data-index');
        gestorDeTareas.cambiarEstadoTarea(index);
      });
    });

    // Escuchador para el boton eliminar
    const btnEliminar = document.querySelectorAll('.btn-eliminar');
    btnEliminar.forEach((boton) => {
      boton.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        gestorDeTareas.eliminarTarea(index);
      });
    });
  }
}

const gestorDeTareas = new GestorDeTareas();

// Escuchador para el botón Agregar Tarea
document.getElementById('btn-agregar').addEventListener('click', () => {
  const titulo = document.getElementById('nombre-tarea').value;

  if (titulo) {
    gestorDeTareas.agregarTarea(titulo);

    document.getElementById('nombre-tarea').value = '';
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Error! Por favor completa todos los campos.',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'small-alert',
      },
    });
  }
});
