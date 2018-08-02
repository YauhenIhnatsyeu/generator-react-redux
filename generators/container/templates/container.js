import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import <%= componentName %> from "<%= importComponentsPath %>/<%= componentName %>";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

export default
connect(mapStateToProps, mapDispatchToProps)(<%= componentName %>);
