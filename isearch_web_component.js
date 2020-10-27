class ISearch extends HTMLElement {
    fullArray = ['Ierger', 'Kwefwqf', 'Itwfwre','Hwefwqf','Lwfw', 'Lwgfver', 'Oqfqaf', 'Iqwerfqarf','Hqaevgq','Hqakhjgfjhg'];
    constructor() {
        super();
        let that = this; 
        this.fullArray = ['Ierger', 'Kwefwqf', 'Itwfwre','Hwefwqf','Lwfw', 'Lwgfver', 'Oqfqaf', 'Iqwerfqarf','Hqaevgq','Hqakhjgfjhg'];
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container">
                <input type="text" class="inputSearch" placeholder="Start typing..." >
            </div>
            <style>
                .container {
                    width: 200px
                }

                .inputSearch {
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid rgb(204, 211, 219);
                    border-radius: 5px;
                    margin-bottom: 2px;
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
                    border: solid 1px #aaa;
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
        `   
        const onSearchInput = function () {
            let itemsArray = that.fullArray; // that === ISearch
            let item = this.value; // t5his === input 
            that.onSearchInput(item, itemsArray);
        }

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.querySelector('.inputSearch').oninput = onSearchInput;
        this.reBuildItemsTable(['Ierger', 'Kwefwqf', 'Itwfwre']); 

    }

    reBuildItemsTable(items) {
        let that = this;
        let table = this.shadowRoot.querySelector('.itemsTable');
        if(table) {
            table.parentNode.removeChild(table);
        }
        table = document.createElement('TABLE');
        table.classList.add('itemsTable')
        this.shadowRoot.querySelector('.container').appendChild(table);

        // callback on choosen item
        const onChooseItem = function () {
            // that === ISearch
            // this === clicked cedll (td)
            that.shadowRoot.querySelector('.inputSearch').value = this.innerText;
            that.reBuildItemsTable([]);
        }

        items.forEach(element => {
            let row = document.createElement("TR");
            let cell = document.createElement("TD");
            let span = document.createElement("SPAN");
            span.innerText = element;
            cell.appendChild(span);
            row.appendChild(cell);
            table.appendChild(row);
            cell.onclick = onChooseItem;
        });
    }

    onSearchInput(item, itemsArray) {
        let matchItems = [];
        itemsArray.forEach(element => {
            if (item && element.startsWith(item)) {
                matchItems.push(element);
            }
        });
        this.reBuildItemsTable(matchItems);
    }    
}

window.customElements.define('i-search', ISearch);