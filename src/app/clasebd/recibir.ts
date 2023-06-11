export class entrega{
    NombreCli:string;
    NoReserva:number;
    FechHoraDev:string;
    KMactual:number;
    Comentarios:string;
    NCombustible:number;


      constructor(){
    this.NombreCli = '';
    this.NoReserva = 0;
    this.FechHoraDev = '';
    this.KMactual = 0;
    this.Comentarios = '';
    this.NCombustible = 0;
      }
}