var myVal = "";
var myArr2=[];

function buttonValue(e) {
	myVal +=e.value;
	document.getElementById("screen").innerText = myVal;

}

function del() {
	myVal = myVal.substring(0, myVal.length-1);
	document.getElementById("screen").innerText = myVal;
}


function empty() {
	myVal ="";
	document.getElementById("screen").innerText = 0;
}

// check if the array contains ()
function checkPat(expressionParts) {
	for (var i = 0; i < expressionParts.length; i++) {
		if(expressionParts[i] === '('){
			return true;
		}else{
			return false;
		}
	}
}

// Converts the array into reverse polish expression
// Returns an array with the reverse polish expression

function infixToPostfix(expressionParts) {
	var opStack=[];
	var expressionArr=[];
	var index = 0;
	var index2 = 0;
	for (var i = 0; i < expressionParts.length; i++) {
		//check if it's number
		if(!isOperator(expressionParts[i])) {
			expressionArr.push(expressionParts[i]);
		}
		//check if it's operands or (
		else if(isOperator2(expressionParts[i])) {
		
			opStack.push(expressionParts[i]);
		}

		else if(expressionParts[i] === ')'){
			
			for (var j = opStack.length-1; j >= 0; j--) {
				if(opStack[j] === '(') {
					opStack.pop();
					break;
				}else {
					expressionArr.push(opStack[j]);
					opStack.pop();
				}
			}
			
		}

	}

	if(opStack.length > 0){
		for (var i = opStack.length - 1; i >= 0; i--) {
			expressionArr.push(opStack[i]);
		}
		opStack = [];
	}

	return expressionArr;
}

// evaluates the reverse polish into the resulting number
// Returns a number
function evaluatePostfix(reversePolish) {
	var numStack=[];
	var result = 0;
	for (var i = 0; i < reversePolish.length; i++) {
		//check if it's number

		if(!isOperator(reversePolish[i])) {
			numStack.push(parseFloat(reversePolish[i]));
		}else {
			
			switch(reversePolish[i]){
				case '+':
					result =  numStack[numStack.length-2] + numStack[numStack.length-1];
					numStack.pop();
					numStack.pop();
					numStack.push(result);
					break;

				case '-':
					result =  numStack[numStack.length-2] - numStack[numStack.length-1];
					numStack.pop();
					numStack.pop();
					numStack.push(result);
					break;

				case '*':
					result =  numStack[numStack.length-2] * numStack[numStack.length-1];
					numStack.pop();
					numStack.pop();
					numStack.push(result);
					break;

				case '/':
					result =  numStack[numStack.length-2] / numStack[numStack.length-1];
					numStack.pop();
					numStack.pop();
					numStack.push(result);
					break;
			}

		}

	}
	result = numStack[0];
	return result;
}

// for infix to postfix
function isOperator2(op) {
	return op === '+' || op === '-' || op === '/' || op === '*' || op === '(';
}


function isPriority(op) {
	return op === '*' || op==='/';
}

function isPlusMin(op) {
	return op === '-' || op==='+';
}





function calculate() {
	var expressionParts = separateOperators(myVal);
	var reversePolish = infixToPostfix(expressionParts);
	var result = evaluatePostfix(reversePolish);
	myVal ="" + result;

	document.getElementById("screen").innerText = result;
}

function separateOperators(expression) {
	
	var myArr2=[];
	var index = 0;
	var myNum = "";
	for (var i = 0; i < myVal.length; i++) {
		
		if(isOperator(myVal.charAt(i))){
			for(j = index; j < i; j++){
				myNum += myVal.charAt(j);
			}
			if(myNum.length > 0) { 
				myArr2.push(myNum);
			}
			
			myArr2.push(myVal.charAt(i));
			index = i + 1;
			myNum = "";
			
		}	
	}

	for (var i = index; i < myVal.length; i++) {
		myNum += myVal.charAt(i);
	}
	if(myNum.length > 0) { 
		myArr2.push(myNum);
	}

	return myArr2;
}


// Checks if given string is an operator or not
function isOperator(op) {
	return op === '+' || op === '-' || op === '/' || op === '(' || op === ')' || op === '*';
}



