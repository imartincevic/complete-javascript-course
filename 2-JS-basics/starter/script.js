console.log('Hello Worlds');

/*****************************
 * CODING CHALLENGE 3
 */

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/

function tipAmount (total) {
    if (total < 50) {
        return total * 0.2;
    } else if (total >= 50 && total <= 200) {
        return total * 0.15;
    } else {
        return total * 0.1;
    }
}

const bills = [124, 48, 268, 50, 200, 201];

bills.forEach(bill => {
    console.log(tipAmount(bill));
});

/*****************************
 * CODING CHALLENGE 4
 */

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true").
*/

var john = {
    name: 'John M',
    mass: 107,
    height: 1.86,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

var mark = {
    name: 'Mark Z',
    mass: 112,
    height: 1.86,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

console.log(`John's BMI: ${john.calcBMI()}`);
console.log(`Mark's BMI: ${mark.calcBMI()}`);

/*****************************
 * CODING CHALLENGE 5
 */

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/
//var allTips = [];
//var totalBills = [];

var johnFamily = {
    billValues: [124, 48, 268, 180, 42],
    allTips: [],
    totalBills: [],

    calculateTip: function () {
//        this.allTips = [];
//        this.totalBills = [];

        for (var i=0; i < this.billValues.length; i++) {
          var percentage;
          var bill = this.billValues[i];

          if (bill < 50) {
              percentage = 0.2;
          } else if (bill >= 50 && bill < 200) {
              percentage = 0.15;
          } else {
              percentage = 0.1;
          }

          console.log("bill: ", bill);
          console.log("percentage: ", percentage);

          this.allTips.push(bill * percentage);
          this.totalBills.push(bill + (bill * percentage));
        }
    }
}

var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.finalValues = [];

        for (var i = 0; i < this.bills.length; i++) {
            // Determine percentage based on tipping rules
            var percentage;
            var bill = this.bills[i];

            if (bill < 50) {
                percentage = .2;
            } else if (bill >= 50 && bill < 200) {
                percentage = .15;
            } else {
                percentage = .1;
            }

            // Add results to the corresponing arrays
            this.tips[i] = bill * percentage;
            this.finalValues[i] = bill + bill * percentage;
        }
    }
}

var markFamily = {
    billValues: [77, 375, 110, 45],
    calculateTip: function () {
        this.allTips = [];
        this.totalBills = [];

        this.billValues.forEach(bill => {
            var percentage;
            if (bill < 50) {
                percentage = 0.2;
            } else if (bill >= 50 && bill < 200) {
                percentage = 0.15;
            } else {
                percentage = 0.1;
            }

            this.allTips.push(bill * percentage);
            this.totalBills.push(bill + (bill * percentage));
        })
    }
}

console.log("John's tips and totals:");
johnFamily.calculateTip();

console.log("tips = ");
johnFamily.allTips.forEach(tip => {
  console.log(tip)
});

console.log("bills = ");
johnFamily.totalBills.forEach(total => {
  console.log(total)
});
