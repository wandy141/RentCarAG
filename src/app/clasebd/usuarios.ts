export class usuarios {
    usuarioid:string;
    nombre:string;
    contrasena:string;
    estado:number;

    constructor() {
        this.usuarioid = '';
        this.contrasena = '';
        this.nombre = '';
        this.estado = 0;       
    }
}