import React from 'react';
import './App.css';
import Hamburger from './hamburger.png'

class App extends React.Component{
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"],
    defaultItem: "",
    dragItem: "" 
  };

  onDragStart = (event,index) => {
    this.draggedItem = this.state.items[index];
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html",event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
    this.setState({
      dragItem: this.draggedItem
    });
  };

  onDragOver = index => {
    const draggedOverItem = this.state.items[index];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem);

    this.setState({ items });
  };

  onDragEnd = () => {
    this.draggedIdx = null;
  };

  updateItem = event => {
    const item = event.target.value.trim();
    this.setState({
      defaultItem: item,
    });
  }

  addItem = event => {
    event.preventDefault();
    const item = this.state.defaultItem
    const newItem = [item];
    const oldItems = this.state.items
    const updateItems = [...oldItems,...newItem];
    this.setState({
      defaultItem: item,
      items:updateItems
    });
  }

  delete = () => {
    const updatedItems = this.state.items.filter(item => item !== this.state.dragItem);
    this.setState({
      items: updatedItems
    })
  }

  render(){
    return (
      <div className="App">
        <main>
          <h3 className="addItems">Add Items</h3>
          <input 
            className="input" 
            value={this.state.defaultItem} 
            onChange={this.updateItem} 
          />
          <button class="btn orange" type="button" onClick={this.addItem}>
            <span>Add Item</span>
          </button>
        </main>
        <main className="wrapper">
          <h3>List of Items</h3>
          <ul>
            {this.state.items.map((item,index) => (
              <li key={item} onDragOver={() => this.onDragOver(index)}>
                <div 
                  className="drag" 
                  draggable 
                  onDragStart={event => this.onDragStart(event,index)}
                  onDragEnd={this.onDragEnd}
                  >
                  <img src={Hamburger} alt="hamburger" />
                  <span className="content">{item}</span>
                </div>
              </li>
            ))}
          </ul>
          <button className="delete" onDragOver={this.delete}>Drop Item here to delete</button>
        </main>
      </div>
    );
  }
}

export default App;
