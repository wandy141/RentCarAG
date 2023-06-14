export class mantenimiento{
    idmantenimiento:number;
    costo_extra:number;
    comentario:string;
    estado:number;
    id_recibir:number;
    id_vehiculo: number;

    constructor(){
    this.idmantenimiento = 0;
    this.costo_extra = 0;
    this.comentario = '';
    this.estado = 0;
    this.id_recibir = 0;
    this.id_vehiculo = 0;
    }
}