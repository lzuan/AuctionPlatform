import React, {Component} from 'react';
import SingleInput from '../components/SingleInput';
import {ETHEREUM_CLIENT, smartContract} from '../components/EthereumSetup';

var getContractID; 

class BiddingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thing1 : '',
			thing2 : '',
			thing3 : '',
			thing4 : ''
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.handleThing1 = this.handleThing1.bind(this);
		this.handleThing2 = this.handleThing2.bind(this);
		this.handleThing3 = this.handleThing3.bind(this);
		this.handleThing4 = this.handleThing4.bind(this);
	}

	componentDidMount() {

	}

	handleThing1(e) {
		this.setState({ thing1: e.target.value }, () => console.log('name:', this.state.thing1));
	}

	handleThing2(e) {
		this.setState({ thing2: e.target.value }, () => console.log('name:', this.state.thing2));
	}

	handleThing3(e) {
		this.setState({ thing3: e.target.value }, () => console.log('name:', this.state.thing3));
	}

	handleThing4(e) {
		this.setState({ thing4: e.target.value }, () => console.log('name:', this.state.thing4));
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
			thing1: '',
			thing2: '',
			thing3: '',
			thing4: ''
		});
	}
	handleFormSubmit(e) {
		e.preventDefault();
		// This is where you would call the web3 functions to make a new contract
		//Get this shit done before sunday
	
		const formPayload = {
			thing1: this.state.thing1,
			thing2: this.state.thing2,
			thing3: this.state.thing3,
			thing4: this.state.thing4
		};

		getContractID = formPayload.thing1;
		// uint cid, bytes32 _supplier, uint _price, uint _bidTime
		smartContract.bid.sendTransaction(formPayload.thing1, formPayload.thing2, formPayload.thing3, formPayload.thing4, {from: ETHEREUM_CLIENT.eth.accounts[1], gas: 200000});

		console.log('Send this in a POST request:', formPayload);
		this.handleClearForm(e);
		window.location.reload();
	}

	render() {
		return (
			<form className="container" onSubmit={this.handleFormSubmit}>
				<h5>FORM TO CREATE BIDS</h5>
				<p>
				<SingleInput
					className="inputField"
					inputType={'number'}
					title={'Contract ID   '}
					name={'name'}
					controlFunc={this.handleThing1}
					content={this.state.thing1}
					placeholder={'Asset'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'text'}
					title={'Supplier   '}
					name={'name'}
					controlFunc={this.handleThing2}
					content={this.state.thing2}
					placeholder={'Supplier'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'number'}
					title={'Price  '}
					name={'name'}
					controlFunc={this.handleThing3}
					content={this.state.thing3}
					placeholder={'Target Price'} />
				</p>
				<p>
				<SingleInput
					className="inputfield"
					inputType={'number'}
					title={'Bid Time   '}
					name={'name'}
					controlFunc={this.handleThing4}
					content={this.state.thing4}
					placeholder={'Target Time'} />
				</p>
				<input
					type="submit"
					className="submitButton"
					value="Submit"/>
				<button
					className="clear"
					onClick={this.handleClearForm}>Clear</button>
			</form>
		);
	}
}
export var contractBids;
export default BiddingForm;