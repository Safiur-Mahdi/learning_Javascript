import React, { Component } from 'react';
import axios from 'axios';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this)
    }
    state = {
        medians: null
    };

    onChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ value: e.target.value })
        }
    }
    async componentDidMount() {
        const response = await fetch('/getEratosthenes');
        const data = await response.json();
        this.setState({ medians: data.express });
    }

    handleSubmit = e => {
        e.preventDefault()
        var inputValue = this.state.value;
        axios({ method: 'post', url: '/create', data: { inputValue } })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Enter a number:</h1>
                    <input value={this.state.value} onChange={this.onChange} />
                    <button type="submit">Submit</button>
                </form>
                <p> {"Medians: " + this.state.medians}</p>
            </div >
        );
    }
}

export default Create;