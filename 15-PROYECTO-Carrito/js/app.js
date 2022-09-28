const carrito = document.querySelector('#carrito'),
    tablaCarrito = document.querySelector('#carrito tbody'),
    vaciarCarrito = document.querySelector('#vaciar-carrito'),
    listaCursos = document.querySelector('#lista-cursos');



LoadEventListener();

let miCarrito = []; //Este arreglo es accesible para todas las demas funciones.

function LoadEventListener(){
    listaCursos.addEventListener('click' , SetCursos);

    carrito.addEventListener('click' , DeleteCursos);

    vaciarCarrito.addEventListener('click', () => {
        miCarrito = [];
        clearHTML();
    });
}

function DeleteCursos(e){
    if(e.target.classList.contains('borrar-curso')){
        let $id = e.target.getAttribute('data-id');
        
        miCarrito = miCarrito.filter(producto => producto.id !== $id);
        MostrarHTML();
    }
}

function SetCursos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        let $identificador = e.target.getAttribute('data-id');
        let $card = listaCursos.querySelector(`a[data-id="${$identificador}"]`).parentNode.parentNode;
        
        ContentHTML($card);
    }
}

function ContentHTML(card){

    const producto = {
        imagen : card.querySelector('img').src,
        titulo : card.querySelector('H4').textContent,
        precio : card.querySelector('p.precio span').textContent,
        id : card.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    let $resultado = miCarrito.some(entidad => entidad.id === producto.id);
    if($resultado){
        //Hay que actualizar los valores.
        let $resultado = miCarrito.map(entidad => {
            if(entidad.id === producto.id){
                entidad.cantidad++;
                return entidad;
            }else{
                return entidad;
            }   
        });
        
       miCarrito = [...$resultado];

    }else{

        miCarrito = [...miCarrito, producto];

    }

    MostrarHTML();
}

function MostrarHTML(){

    //Limpiar HTML
    clearHTML();

    //Mostrar HTML
    miCarrito.forEach(producto => {
        // El Destructuring de nuestro producto.
        const {imagen, titulo, precio, id, cantidad} = producto;

        const $contenido = document.createElement('tr');
        $contenido.innerHTML = `
            <td>
                <img src="${imagen}" alt="Imagen Carrito de Comprar"/>
            </td>

            <td>
                ${titulo}
            </td>

            <td>
                <p><strong>${precio}</strong></p>
            </td>

            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" data-id="${id}" class="borrar-curso">X</a>
            </td>
        `;

        tablaCarrito.appendChild($contenido);
    });
}

function clearHTML(){
    while(tablaCarrito.firstChild){
        tablaCarrito.removeChild(tablaCarrito.firstChild);
    }
}