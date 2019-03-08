// BUDGET controller
const budgetController = (function() {

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalInc) {
        if (totalInc > 0) {
            this.percentage = Math.round((this.value / totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
            console.log('current sum for ' + type + ' = ' + sum);
            
        });
        data.totals[type] = sum;
    };

    const data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, desc, val) {
            let newItem, ID;

            // selecting first the correct type (exp or inc) and then taking the last element (length - 1)
            // then get that element's id and add 1 to it to create incremental new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            if(type === 'expense') {
                newItem = new Expense(ID, desc, val);
            } else if(type === 'income') {
                newItem = new Income(ID, desc, val);
            }
            // store new item to correct array
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {
            let ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // Calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');

            // Calculate the budget
            data.budget = data.totals.income - data.totals.expense;

            // Calculate the percentage of income that we spent
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            data.allItems.expense.forEach(function(cur) {
                cur.calcPercentage(data.totals.income);
            });
        },

        getPercentages: function() {
            let allPerc = data.allItems.expense.map(function(cur) {
                return cur.getPercentage()
            });

            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data);
        }
    };
})();

//UI controller
const UIController = (function() {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        addButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    const formatNumber = function(num, type) {
        let numSplit, int, dec;
        /* sign before numbers
            2 decimal points
            comma for thousands */
            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.');
            
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }

            dec = numSplit[1];

            return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    const nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        getInput: function() {
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type) {
            let html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'income') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder with the actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
 
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorId) {
            let element = document.getElementById(selectorId);
            element.parentNode.removeChild(element);
        },

        clearFields: function() {
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            let fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(element => {
                element.value = "";
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            let type;
            obj.budget > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'income');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'expense');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            let fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function() {
            let now, year, month, months;
            now = new Date();

            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            month = months[now.getMonth()];
            year = now.getFullYear();

            document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;
        },

        changedType: function() {
            const fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.addButton).classList.toggle('red');
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

// Global app controller
const controller = (function(budgetCtrl, UICtrl) {

    const setupEventListeners = function() {
        const DOMObject = UIController.getDOMstrings();

        document.querySelector(DOMObject.addButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOMObject.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOMObject.inputType).addEventListener('change', UICtrl.changedType);
    };

    const updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = budgetCtrl.getBudget();

        // 3. Display it on UI
        UICtrl.displayBudget(budget);
        
    }

    const updatePercentages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        let percentages = budgetCtrl.getPercentages();

        // 3. Update the UI
        UICtrl.displayPercentages(percentages);
        
    };

    const ctrlAddItem = function() {
        // 1. get the field input data
        let input = UICtrl.getInput();
        console.log(input);
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. clear fields
            UICtrl.clearFields();

            // 5. calculate and update the budget
            updateBudget();

            updatePercentages();
        }
    }

    const ctrlDeleteItem = function(event) {
        let itemId, splitId, type, id;
        
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);

            // delete item from the data structure
            budgetController.deleteItem(type, id);

            // delete item from UI
            UICtrl.deleteListItem(itemId);

            // update and show the new budget
            updateBudget();

            updatePercentages();
        }
    };

    return {
        init: function() {
            console.log('Application has started!');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();