
class Calculator{

    add(number1, number2){
        this.validateNumber(number1);
        this.validateNumber(number2);
        
        return number1 + number2;
    }

    divide(number1, number2){
        this.validateNumber(number1);
        this.validateNumber(number2);
        if(number2 === 0) throw new Error('Divide by zero is not permitted.');
        
        return number1 / number2;
    }

    validateNumber(value){
        if(!this.isNumeric(value)) throw new Error('Value should be a number.');
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

}

class AuthenticationService{

    login(username, password) {

        var promise = new Promise((resolve, reject)=> {

            if(username === "rahman" && password === "rahman"){
                resolve(true);
            }else{
                resolve(false);
            }
        });

        return promise;
    }

    async loginAsync(username, password) {

        setTimeout(()=> {
            if(username === "rahman" && password === "rahman"){
                return true;
            }else{
                return false;
            }
        }, 1000)

        return false;      
    }

    loginWithInfo(username, password) {
        
        let db = new Database();
        let user = db.login(username, password);
        if(user){
            return user;
        }

        return null;
    }
}

class Database{

    login(username, password){

        if(username === "rahman" && password === "rahman"){
            let user = new User();
            user.id = 1;
            user.name = "rahman mahmoodi";
            return user;
        }

        return null;
    }

}

class User{

    constructor(){
        this.id = 0;
        this.name = "";
    }
}

module.exports = {
    Calculator:Calculator,
    AuthenticationService: AuthenticationService,
    Database: Database,
    User : User
};