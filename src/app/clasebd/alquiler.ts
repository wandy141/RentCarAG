export class alquiler {
idalquiler:number;
usuario:string;
fecha:string;
idvehiculo:number;
seguro:string;
lugar_entrega:string;
lugar_recibir:string;
precio:number;
fechaini:string;
fechafin:string;
dias:number;
total:number;
idcliente:number;
nombrecliente:string;
estado:number;


    constructor() {
        this.idalquiler = 0;
        this.usuario = '';
        this.fecha = '';
        this.idvehiculo = 0;
        this.seguro = '';
        this.precio = 0;
        this.fechaini = '';
        this.fechafin = '';
        this.dias = 0;
        this.total = 0;
        this.idcliente = 0;
        this.nombrecliente = '';
        this.estado = 0;
        this.lugar_entrega= '';
        this.lugar_recibir='';
    }
}
