export class recibir{
  idrecibir:number;
  idcliente:number;
    NombreCli:string;
    NoReserva:number;
    FechHoraDev:string;
    KMactual:number;
    Comentarios:string;
    NCombustible:number;


      constructor(){
        this.idrecibir = 0;
    this.idcliente = 0;
    this.NombreCli = '';
    this.NoReserva = 0;
    this.FechHoraDev = '';
    this.KMactual = 0;
    this.Comentarios = '';
    this.NCombustible = 0;
      }
}