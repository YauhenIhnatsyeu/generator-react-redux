import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import <%= componentName %> from "<%= importComponentsPath %>/<%= componentName %>";
<% if (typeof actionCreators !== 'undefined' && actionCreators) { %>import {<% for (actionCreator of actionCreators) { %>
    <%= actionCreator %>,<% } %>
} from "<%= importActionCreatorsPath %>";
<% } %>
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({<% if (typeof actionCreators !== 'undefined' && actionCreators) { %><% for (actionCreator of actionCreators) { %>
        <%= actionCreator %>,<% } %>
    <% } %>}, dispatch);

export default
connect(mapStateToProps, mapDispatchToProps)(<%= componentName %>);
