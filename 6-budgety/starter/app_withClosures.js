var budgetController = (function() {
    let x= 23;
    let add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            return add(b);
        }
    }
})();

var UIController = (function() {

})();

var controller = (function(budgetCtrl, UICtrl) {
    let z = budgetCtrl.publicTest(6);

    return {
        anotherPublic: function() {
            console.log(`now from another: ${z}`);
            
        }
    }
})(budgetController, UIController);

