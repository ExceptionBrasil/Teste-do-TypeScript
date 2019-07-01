System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundo = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            let unidade = 'ms';
            if (emSegundo) {
                unidade = 's';
            }
            descriptor.value = function (...args) {
                console.log('-------------');
                console.log(`Parâmetros ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`retorno: ${JSON.stringify(retorno)}`);
                console.log(`Tempo de execução: ${t2 - 1} ${unidade}`);
                console.log('-------------');
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
