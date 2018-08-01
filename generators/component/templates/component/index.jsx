import React, { Component } from "react";

import PropTypes from "prop-types";
<% if (indexCssIsNeeded) { %>
import "./index.css";
<% } %>
export default class <%= componentName %> extends Component {
    constructor(props) {
        super(props);<% if (stateIsNeeded) { %>
        
        this.state = {
        };<% } %>
    }

    render() {
        return null;
    }
}

<%= componentName %>.propTypes = {
};

<%= componentName %>.defaultProps = {
};
