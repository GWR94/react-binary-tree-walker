import React from "react";
import Tree from "react-d3-tree";
import BinarySearchTree from "./BinarySearchTree";

class TreeVisualiser extends React.Component<any> {
	public treeContainer: any;
	state: any = {
		tree: {},
		treeType: null,
		newNumber: "",
		values: [],
		translate: {}
	};

	componentDidMount() {
		const dimensions = this.treeContainer.getBoundingClientRect();
		this.setState({
			translate: {
				x: dimensions.width / 2,
				y: dimensions.height / 4
			}
		});
	}

	componentWillMount() {
		const values = Array.from({ length: 5 }, () =>
			Math.floor(Math.random() * 1000)
		);
		console.log(values);
		const BST = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	}

	onAddNumber = () => {
		const values = this.state.values;
		values.push(parseInt(this.state.newNumber));
		const BST = new BinarySearchTree(values);
		this.setState({ tree: BST.returnTree(), values });
	};

	render() {
		return (
			<div
				style={{
					border: "1px solid red",
					width: "100%",
					height: "60vh"
				}}
				ref={tc => (this.treeContainer = tc)}
			>
				{this.state.newNumber}
				<Tree
					data={this.state.tree && this.state.tree}
					translate={this.state.translate}
					orientation="vertical"
				/>
				<input
					value={this.state.newNumber}
					onChange={e => this.setState({ newNumber: e.target.value })}
				/>
				<button onClick={this.onAddNumber}>Add</button>
			</div>
		);
	}
}

export default TreeVisualiser;
