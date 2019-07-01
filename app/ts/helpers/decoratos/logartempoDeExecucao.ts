export function logarTempoDeExecucao(emSegundo:boolean=false){

    return function(target:any,propertyKey:string,descriptor:PropertyDescriptor){
        const metodoOriginal =  descriptor.value;
        let unidade = 'ms';
        if(emSegundo){
            unidade ='s'
        }

        descriptor.value =function(...args:any[]){
            console.log('-------------');
            console.log(`Parâmetros ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();

            const retorno = metodoOriginal.apply(this,args);

            const t2 = performance.now();
            console.log(`retorno: ${JSON.stringify(retorno)}`);
            console.log(`Tempo de execução: ${t2-1} ${unidade}`);
            console.log('-------------');
            return retorno;
        }
        return descriptor;
    }
}