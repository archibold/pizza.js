(function() {
	document.getElementById('add_pizza_btn').addEventListener('click', function() {
		const new_pizza = createPizzaElement();
		lst_pizza.push(new_pizza);

		new_pizza.onchange = function() {
			let best_index = 0;

			for(let i=0; i < lst_pizza.length; i++) {
				const current = lst_pizza[i].getPrice();
				const best = lst_pizza[best_index].getPrice();
				
				if(current <= best) {
					best_index = i;
				}
				lst_pizza[i].setStatus(false)
			}

			lst_pizza[best_index].setStatus(true)
			console.log(lst_pizza[best_index]);
		}

		container = document.getElementById('container');
		container.appendChild(new_pizza);
	});

	function createPizzaElement() {
		const me = {
			size: 0,
			price: 0
		};

		const elem = document.createElement('div');
		elem.className = 'pizza-container';
		const size_input = document.createElement('input');
		const price_input = document.createElement('input');
		const size_label = document.createElement('label');
		const price_label = document.createElement('label');
		
		size_input.setAttribute('name', 'size');
		price_input.setAttribute('name', 'price');

		size_label.setAttribute('for', 'size');
		price_label.setAttribute('for', 'price');
		size_label.innerHTML = 'size';
		price_label.innerHTML = 'price';

		size_input.type = "number";
		price_input.type = "number";

		size_input.onchange = function(evt) {
			me.size = evt.target.value;

		};

		price_input.onchange = function(evt) {
			me.price = evt.target.value;
		};
		
		elem.appendChild(size_label);
		elem.appendChild(size_input);
		elem.appendChild(price_label);
		elem.appendChild(price_input);

		elem.getPrice = function () {
			return +me.price / +me.size
		}

		elem.setStatus = function(status) {
			if(status) {
				//set the best
				if(!elem.className.includes('best-pizza')){
					elem.className += ' best-pizza';
				}
			} else {
				//set to normal
				elem.className = elem.className.split(' best-pizza').join('');
			}
		}
		
		return elem;
	}
})()

let lst_pizza = [];
