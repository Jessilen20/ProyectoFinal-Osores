/*Alcancia virtual*/

//Agrega y retira montos
//Ver saldo
//Interactuar con botones para agregar o retirar dinero
//


//Constructor de botones para agregar cantidades
class montoComun {
    constructor(id, nombre, precio, formaFisica) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.forma = formaFisica;
        this.cantidad = 1;
    }
}

//Declaracion de botones para intenractuacar
const diezC = new montoComun(1, "DiezCent", 0.1, "moneda");
const veinteC = new montoComun(2, "VeinteCent", 0.2, "moneda");
const cincuC = new montoComun(3, "CincuentaCent", 0.5, "moneda");
const unoS = new montoComun(4, "Uno", 1, "moneda");
const dosS = new montoComun(5, "Dos", 2, "moneda");
const diezS = new montoComun(6, "Diez", 10, "billete");
const veinteS = new montoComun(7, "Veinte", 20, "billete");
const cincuS = new montoComun(8, "Cincuenta", 50, "billete");

//Array con los tipos de botones

const montoBotones = [diezC, veinteC, cincuC, unoS, dosS, diezS, veinteS, cincuS];

//Probando un array de montos para la alcancia

var alcancia = [];
var monto1 = 0;
var monedas = 0;
var billetes = 0;

/** CARGAR ALCANCIA DESDE EL LOCALSTORAGE: **/
//Si hay algo en el localStorage, lo cargamos en el carrito. 

if (localStorage.getItem("montoBotones")) {
    alcancia = JSON.parse(localStorage.getItem("montoBotones"));
}

//Agregar los montos - evento en cada boton de las cantidades

const boton1 = document.getElementById("1");
boton1.addEventListener("click", () => {
    alcancia = agregarDinero(1);
    conteoMonto();
    
})

const boton2 = document.getElementById("2");
boton2.addEventListener("click", () => {
    alcancia = agregarDinero(2);
    conteoMonto();
})

const boton3 = document.getElementById("3");
boton3.addEventListener("click", () => {
    alcancia = agregarDinero(3);
    conteoMonto();
})

const boton4 = document.getElementById("4");
boton4.addEventListener("click", () => {
    alcancia = agregarDinero(4);
    conteoMonto();
})

const boton5 = document.getElementById("5");
boton5.addEventListener("click", () => {
    alcancia = agregarDinero(5);
    conteoMonto();
})

const boton6 = document.getElementById("6");
boton6.addEventListener("click", () => {
    alcancia = agregarDinero(6);
    conteoMonto();
})

const boton7 = document.getElementById("7");
boton7.addEventListener("click", () => {
    alcancia = agregarDinero(7);
    conteoMonto();
})

const boton8 = document.getElementById("8");
boton8.addEventListener("click", () => {
    alcancia = agregarDinero(8);
    conteoMonto();
})


//ARRAY ALCANCIA: Funcion almacenar montos

const agregarDinero = (id) => {
    const montoAgregado = alcancia.find(montoComun => montoComun.id === id);
    if (montoAgregado) {
        montoAgregado.cantidad++;

    } else {
        const montoComun = montoBotones.find(montoComun => montoComun.id === id);
        alcancia.push(montoComun);
        localStorage.setItem("alcancia", JSON.stringify(alcancia));
    }
    return alcancia;
}
console.log(alcancia);

//ARRAY ALCANCIA: Vaciar los montos seleccionados
const limpiar = document.getElementById("limpiar");

limpiar.addEventListener("click", () => {
    limpiarMontos();
})

const limpiarMontos = () => {
    alcancia = [];
    conteoMonto();
    mensajeSuma.innerHTML=` `
    mensajeResta.innerHTML=` `
    mensajeConteo.innerHTML=` `
    //localStorage: 
    localStorage.clear();
}


//ARRAY ALCANCIA: Conteo de montos seleccionado

const total = document.getElementById("total");

const conteoMonto = () => {
    let totalMonto = 0;
    alcancia.forEach(montoComun => {
        totalMonto += montoComun.precio * montoComun.cantidad;
    })
    console.log(totalMonto);
    total.innerHTML = ` S/.${totalMonto}`;
    
}

//FUNCIONES DE ALCANCIA
//Mensaje segun la funcion
const mensajeSuma = document.getElementById("msgSuma");
const mensajeResta = document.getElementById("msgResta");
const mensajeConteo = document.getElementById("msgConteo");

//Funcion de ingresos
function ingreso(alcan, monto){
    let totalMonto = 0;
    alcan.forEach(montoComun =>{
        totalMonto += montoComun.precio * montoComun.cantidad;
    })
    monto = monto + totalMonto;
    return monto;
}

const botonSuma = document.getElementById("suma");
botonSuma.addEventListener("click", () => {
    monto1 = ingreso(alcancia,monto1);
    console.log(monto1);
    mensajeSuma.innerHTML=`<p>Ahora tienes ahorrado S/.${monto1} </p>`
})

//Funcion de egresos
function egreso(alcan, monto){
    let totalMonto = 0;
    alcan.forEach(montoComun =>{
        totalMonto += montoComun.precio * montoComun.cantidad;
    })
    monto = monto - totalMonto;
    return monto;
}

const botonResta = document.getElementById("resta");
botonResta.addEventListener("click", () => {
    monto1 = egreso(alcancia,monto1);
    console.log(monto1);
    mensajeResta.innerHTML = `<p>Sacaste dinero y te queda S/.${monto1} </p>`;
})

//Funcion conteo de billetes y monedas

function conteoBilletesMonedas(alcan){
    let arrayMB = [0,0];
    alcan.forEach(montoComun =>{
        if(montoComun.forma == "moneda"){
            arrayMB[0] += montoComun.cantidad;
        }
        else if(montoComun.forma == "billete"){
            arrayMB[1] += montoComun.cantidad;
        }
        console.log(arrayMB);    
    })
    return arrayMB;
}

const botonConteo = document.getElementById("conteo");
botonConteo.addEventListener("click", () => {
    arrayConteo = conteoBilletesMonedas(alcancia);
    monedas = arrayConteo[0];
    billetes = arrayConteo[1];
    mensajeConteo.innerHTML=`<p>Tienes ${monto1} soles en ${monedas} monedas y ${billetes} billetes </p>`
})