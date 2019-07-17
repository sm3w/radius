import React, { Component } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

export default class AppForm extends Component {
    
    state = {
        postcode: undefined,
        radius: undefined,
        member_results: []
    }
    
    handle_postcode_change = (e) => {
        this.setState({ postcode: e.target.value });
    };

    handle_radius_change = (e) => {
        this.setState({ radius: e.target.value });
    };


    handle_onSubmit_a = (e) => {
        e.preventDefault();
        this.props.api_call(e);

    }
    handle_onSubmit = (e) => {
        e.preventDefault(e);
        const pcr = {
            postcode: e.target.elements.postcode.value,
            radius: e.target.elements.radius.value
        };
        console.log(pcr);
        if((pcr.postcode || pcr.radius) === undefined) {
            return;
        }
        axios.post('/api/records', pcr)
        .then(function (response) {
                console.log(response.data);
        })
        .catch(function (error) {
                console.log(error);
        });
        
    };
    render() {
        return (
            <Container>
                <div className="spacer"> &nbsp;</div>
                    <Form className="mb-5" inline autoComplete="off" onSubmit={this.handle_onSubmit_a}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="Postcode" className="mr-sm-2">Postcode</Label>
                            <Input type="text" name="postcode" id="Postcode" placeholder="e.g HA4 8SS" 
                                onChange={this.handle_postcode_change} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="Radius" className="mr-sm-2">Radius</Label>
                            <Input type="text" name="radius" id="Radius" placeholder="10" onChange={this.handle_radius_change}/>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
            </Container>
        )
    }
}
/*
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)
      }
      */