const countries = {
    'Nigeria' : 'NG',
    'Ghana' : 'GH',
    'Kenya' : 'KE',
    'Uganda' : 'UG',
    'South Africa' : 'ZA'
}

const filterCountry = (country = null)=>{
    if(country == null){
        return 'NG';
    }
    country = country.toUpperCase();

    if(country == 'NIGERIA'){
        return 'NG'
    }

    if(country == 'GHANA'){
        return 'GH'
    }

    if(country == 'KENYA'){
        return 'KE'
    }

    if(country == 'UGANDA'){
        return 'UG'
    }
    return country;
}

const randomNumber = (max)=> {
    return Math.floor(Math.random() * max);
}

const isString = (string) =>{
    if (typeof string === 'string' || string instanceof String){
        return true;
    }
    return false;
}

/**
 * Converts a string containing a function or object method name to a function pointer.
 * @param  string   func
 * @return function
 */
 const getFunctionFromString = (func)=> {
    // if already a function, return
    if (typeof func === 'function') return func;

    // if string, try to find function or method of object (of "obj.func" format)
    if (typeof func === 'string') {
        if (!func.length) return null;
        var target = global;
        var func = func.split('.');
        while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
        }
        if (typeof target === 'function') return target;
    }

    // return null if could not parse
    return null;
}

const  executeFunctionByName = (functionName, context , args ) => {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
  }
  

module.exports = {
    filterCountry,
    randomNumber,
    isString,
    getFunctionFromString,
    executeFunctionByName,
    countries
};