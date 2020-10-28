(function () {
	const template = document.createElement('template');
	template.innerHTML = `
            <div class="container">
                <input type="text" class="inputSearch" placeholder="Start typing..." >
            </div>
            <style>
                .container {
                    width: 100%;
                }

                .inputSearch {
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid rgb(204, 211, 219);
                    border-radius: 5px;
					margin-bottom: -1px;
					box-sizing: border-box;
                }

                .inputSearch:focus {
                    border: 2px solid rgb(204, 211, 219);;
                    outline: none;
                }

                .itemsTable {
                    width: 100%;
                    font: 16px Arial;   
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                .itemsTable td {
                    border: solid 1px rgb(204, 211, 219);
                    padding-top: 8px;
                    padding-bottom: 8px;
                }

                .itemsTable td:hover {
                    background-color: #e9e9e9; 
                }

                .itemsTable span {

                    margin: 0.5rem;
                }   
            </style>
        `;

	window.customElements.define(
		'com-sap-sample-isearchsac1',
		class ISearch extends HTMLElement {
			constructor() {
				super();
				let that = this;
				this.fullArray = [
					'Ierger',
					'Kwefwqf',
					'Itwfwre',
					'Hwefwqf',
					'Lwfw',
					'Lwgfver',
					'Oqfqaf',
					'Iqwerfqarf',
					'Hqaevgq',
					'Hqakhjgfjhg',
				];
				this._choosenItem = 'default';
				const onSearchInput = function () {
					let itemsArray = that.fullArray; // that === ISearch
					let item = this.value; // t5his === input
					that.onSearchInput(item, itemsArray);
				};

				let shadowRoot = this.attachShadow({ mode: 'open' });
				shadowRoot.appendChild(template.content.cloneNode(true));
				shadowRoot.querySelector('.inputSearch').oninput = onSearchInput;
				this.reBuildItemsTable([]);
			}

			//Fired when the widget is added to the html DOM of the page
			connectedCallback() {}

			//Fired when the widget is removed from the html DOM of the page (e.g. by hide)
			disconnectedCallback() {}

			//When the custom widget is updated, the Custom Widget SDK framework executes this function first
			onCustomWidgetBeforeUpdate(oChangedProperties) {}

			//When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
			onCustomWidgetAfterUpdate(oChangedProperties) {
			}

			//When the custom widget is removed from the canvas or the analytic application is closed
			onCustomWidgetDestroy() {}

			reBuildItemsTable(items) {
				let that = this;
				let table = this.shadowRoot.querySelector('.itemsTable');
				if (table) {
					table.parentNode.removeChild(table);
				}
				table = document.createElement('TABLE');
				table.classList.add('itemsTable');
				this.shadowRoot.querySelector('.container').appendChild(table);

				// callback on choosen item
				const onChooseItem = function () {
					// that === ISearchs
					// this === clicked cedll (td)
					that.shadowRoot.querySelector('.inputSearch').value = this.innerText;
					that.reBuildItemsTable([]);

					// Update property
					that._choosenItem = this.innerText;

					// Send event to be used by external framework
					let event = new Event('onChooseItem');
					that.dispatchEvent(event);	
				};

				items.forEach((element) => {
					let row = document.createElement('TR');
					let cell = document.createElement('TD');
					let span = document.createElement('SPAN');
					span.innerText = element;
					cell.appendChild(span);
					row.appendChild(cell);
					table.appendChild(row);
					cell.onclick = onChooseItem;
				});
			}

			onSearchInput(item, itemsArray) {
				let matchItems = [];
				itemsArray.forEach((element) => {
					if (item && element.startsWith(item)) {
						matchItems.push(element);
					}
				});
				this.reBuildItemsTable(matchItems);
			}

			//Getters and Setters

			getChoosenItem() {
				return this._choosenItem;
			}

			setItems(items) {
				this.fullArray = items;
			}

			get choosenItem() {
				debugger;
				return this._choosenItem;
			}

			set choosenItem(value) {
				debugger;
				this._choosenItem = value;
			}

		}
	);

	//window.customElements.define('i-com-sap-sample-isearchsac1', ISearch);
})();
