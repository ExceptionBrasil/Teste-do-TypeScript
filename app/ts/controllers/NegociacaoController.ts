// import { Negociacao } from './../models/Negociacao';
// import { Negociacoes } from './../models/Negociacoes';
// import { NegociacoesViews } from './../views/NegociacoesView';
// import { MensagemView } from './../views/MensagemView';

import {logarTempoDeExecucao} from '../helpers/decoratos/index';
import { Negociacao,Negociacoes } from '../models/index';
import { NegociacoesViews, MensagemView } from '../views/index';
import {domInject} from'../helpers/decoratos/index';

export class NegociacaoController{

    @domInject('#data')
    private _inputData:JQuery;

    @domInject('#quantidade')
    private _inputQuantidade:JQuery;

    @domInject('#valor')
    private _inputValor:JQuery;
    private _negociacoes= new Negociacoes();

    private _negociacoesView = new NegociacoesViews('#negociacoesView',true);
    private _mensagemView = new MensagemView("#mensagemView");    


    constructor(){
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');
        
        this._negociacoesView.update(this._negociacoes);
    }
   
    adiciona(event:Event){       
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)) {

            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

        const negociacao = new Negociacao(
            new Date(this._inputData.val().replace(/-/g,',')),
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );
        
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negocição adcionada com sucesso!");

        // this._negociacoes.paraArray().forEach( negociacao=>{            
        // });
    }

    importaDados(){

        function isOk(res:Response){
            if(res.ok){
                return res;
            }else{
               throw new Error(res.statusText) 
            }
        }

        fetch('http://localhost:8080/dados')
        .then(res=> isOk(res))        
        .then(res => res.json())
        .then((dados:any[])=> {
            dados
                .map(dado=> new Negociacao(new Date,dado.vezes,dado.montante))
                .forEach(negociacao=> this._negociacoes.adiciona(negociacao));
                
                this._negociacoesView.update(this._negociacoes);
        })
        .catch(err=> console.log(err.message));
    }
    private _ehDiaUtil(data: Date) {

        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }
    //teste;
}

enum DiaDaSemana {

    Domingo, 
    Segunda, 
    Terca, 
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado
}