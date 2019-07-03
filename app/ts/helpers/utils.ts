import { Negociacoes, Imprimivel } from "../models/index";

export function imprime(...objs:Imprimivel[]){
    objs.forEach(n=> n.paraTexto());
}