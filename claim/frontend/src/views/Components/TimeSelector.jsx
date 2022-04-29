
import React, { Component } from "react";
import {Container, Row, FormControl } from "react-bootstrap";

class TimeSelector extends Component {
    render() {
        return (
        <div className="time_selector">
            <Container fluid>
                <Row>
                    <FormControl as="select" className="w-100">
                        <option>None</option>
                        <option>00:00</option>
                    </FormControl>
                </Row>
            </Container>
        </div>
        );
    }
}

export default TimeSelector;
