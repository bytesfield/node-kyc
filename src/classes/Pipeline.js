
class Pipeline {

    /**
    * Set the object being sent through the pipeline.
    *
    * @param  {mixed}  passable
    * @return this
    */
    send(passable){
        this.passable = passable;

        return this;
    }

    /**
    * Set the array of pipes.
    *
    * @param  {array|mixed } pipes
    * @return this
    */
    through(pipes){
        this.pipes = Array.isArray(pipes) ? pipes : null;

        return this;
    }


    /**
    * Set the method to call on the pipes.
    *
    * @param  {string}  method
    * @return this
    */
    via(method){
        this.method = method;
 
        return this;
    }

     /**
    * Run the pipeline with a final destination.
    *
    * @return mixed
    */
    async thenReturn(){
        var i;
  
        for (i = 0; i < this.pipes.length; i++) {
            var executedPipe  = await this.pipes[i].handle(this.passable);
            
            if(this.passable.isSuccessful()){
                var response = executedPipe;
                break;  
            }
            
        }
        return response;
       
    }
}

module.exports = Pipeline;