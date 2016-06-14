'use strict';
const log   = load('/lib/utils/log');
const core  = require('./core');
const co        = load('co');

module.exports = {
    start : (config) =>{
        function pullTask(){
            co(function* (){
                yield core.beat();
                
                setTimeout(pullTask,config.interval);
            })
        }

        log.debug('begin interval pull');
        setTimeout(pullTask,config.interval);
        core.start(config);
    }  
};