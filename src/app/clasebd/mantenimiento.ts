export class mantenimiento{
    idmantenimiento:number;
    costo_extra:number;
    comentario:string;
    id_vehiculo: number;

    constructor(){
    this.idmantenimiento = 0;
    this.costo_extra = 0;
    this.comentario = '';
    this.id_vehiculo = 0;
    }
}