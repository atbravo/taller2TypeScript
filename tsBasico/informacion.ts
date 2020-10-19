export class Informacion {
    codigo : string;
    cedula : string;
    edad : number;
    direccion : string;
    telefono : string;
  
    constructor(codigo : string, cedula : string, edad : number, direccion : string, telefono : string)
    {
        this.cedula = cedula;
        this.codigo = codigo;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }  
}